import { USER_SIGNIN, USER_SIGNOUT , USER_GET_COIN_BALANCE ,USER_GET_PRODUCT_LIST, USER_EDIT_PROFILE} from './types';
import { UserModel, UserRoleModel } from '../models';
import { editProfileService, getProductListService, sendExchangeCoinService ,getCoinBalanceService} from '../service/user.service';
import { signIn, signUp, signOut, verifyToken, checkPublicAddress } from '../service/auth.service'
import { sentTranferRequestService } from '../service/external.service';
import { alertChange, alertLoading } from './alert.actions';
import { apiHeader } from '../helpers/header';

import Web3 from 'web3';
const jwt = require('jsonwebtoken');
let web3: Web3 | undefined = undefined; // Will hold the web3 instance

export const userSignin = (data) => async (dispatch) => {
  const publicAddress = await checkMetaMask(dispatch)
  try {
      const nonce = await handleCheckPublicAddress({
          publicAddress: publicAddress
      })

      const signature = await encodeSignature({
          publicAddress: publicAddress,
          nonce: nonce
      })

      const userInfo = await handleSignIn({
          signature: signature
      })

      const userDetail = await {
          ...userInfo,
          role: new UserRoleModel({
              level: userInfo.roleID
              // level: 1 
          }),
          walletId: publicAddress[0],
      }

      if (userInfo.status === 2) {
          await dispatch({
              type: USER_SIGNIN,
              payload: new UserModel(userDetail)
          })
          await dispatch( alertChange('Info', 'Please Fill out the registration'));
          return true
      }
      else if ( userInfo.status === 3 ) await dispatch( alertChange('Info', 'Please verify your email before using the application'));
      else {
          await dispatch({
              type: USER_SIGNIN,
              payload: new UserModel(userDetail)
          })

          await dispatch(alertChange('Success', 'Login successfully'))
      }
      
      return false
  } catch (error) {
      await dispatch( alertChange('Danger', 'Login failed') )
      await data.Moralis.logout();
      return false
  }
};

const checkMetaMask = async (dispatch) => {
  if (!(window.ethereum)) {
      await dispatch( alertChange('Warning', 'Please install MetaMask first.') )
      return;
  }

  if (!web3) {
      try {
          // Request account access if needed
          await (window.ethereum.enable());

          // We don't know window.web3 version, so we use our own instance of Web3
          // with the injected provider given by MetaMask
          web3 = new Web3(window.ethereum);
      } catch (error) {
          await dispatch( alertChange('Warning', 'You need to allow MetaMask.') )
          return;
      }
  }

  // const publicAddress = await web3.eth.getCoinbase();
  const publicAddress = await web3.eth.getAccounts();
  if (!publicAddress) await dispatch( alertChange('Warning', 'Please activate MetaMask first.') )
  else return publicAddress
  return
};

const handleCheckPublicAddress = async (data) => {
  const nonce = await checkPublicAddress(data.publicAddress)
  return nonce
};

const encodeSignature = async (data) => {
  const signature = await jwt.sign({
      publicAddress: data.publicAddress,
      nonce: data.nonce
  }, process.env.REACT_APP_TOKEN_SECRET, {
      expiresIn: process.env.REACT_APP_TOKEN_LIFE
  });

  return signature
};

const handleSignIn = async (data) => {
  const formData = await { "signature": data.signature };
  const userInfo = await signIn(formData);
  return userInfo
}

export const userSignup = (input) => async (dispatch) => {
  try {
    const formData = await {
        "firstname": input.formData.firstName,
        "lastname": input.formData.lastName,
        "email": input.formData.email,
        "userId": input.formData._id
    };

    await signUp( formData )
    await input.moralis.logout();
    await dispatch( userSignout() );

    return true
  } catch (error) {
      console.log( 'error :', error )
      return false
  }
};

export const userSignout = () => (dispatch) => {
  dispatch(alertChange('Info', 'ออกจากระบบสำเร็จแล้ว'));
  dispatch({
    type: USER_SIGNOUT,
    payload: true
  });
  signOut();
  return true;
};

export const userClear = () => (dispatch) => {
  dispatch({
    type: USER_SIGNOUT,
    payload: false
  });
  return true;
};

export const userVerify = (token) => async (dispatch) => {
  dispatch(alertLoading(true));
  const fetch1 = await fetch(`${process.env.REACT_APP_API_URL}auth/verify/${token}`, {
    method: 'GET',
    headers: apiHeader()
  });
  const data1 = await fetch1.json();
  dispatch(alertLoading(false));
  if(!fetch1.ok || fetch1.status !== 200) {
    return false;
  }
  return data1;
};


export const userForgetPassword = (input) => async (dispatch) => {
  dispatch(alertLoading(true));
  const fetch1 = await fetch(`${process.env.REACT_APP_API_URL}auth/forget-password`, {
    method: 'POST',
    headers: apiHeader(),
    body: JSON.stringify(input),
  });
  const data1 = await fetch1.json();
  if(!fetch1.ok || fetch1.status !== 200) {
    dispatch(alertChange('Warning', data1.message, data1.errors));
    return false;
  }
  
  dispatch(alertChange('Info', 'ขอการตั้งรหัสผ่านใหม่สำเร็จแล้ว'));
  return true;
};
export const userCheckResetPassword = (token) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(alertLoading(true));
    const fetch1 = await fetch(`${process.env.REACT_APP_API_URL}auth/check-reset-password?token=${token}`, {
      method: 'GET',
      headers: apiHeader()
    });
    dispatch(alertLoading(false));
    if(!fetch1.ok || fetch1.status !== 200) {
      resolve(false);
    } else {
      resolve(true);
    }
  });
};
export const userResetPassword = (input) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(alertLoading(true));
    const fetch1 = await fetch(`${process.env.REACT_APP_API_URL}auth/reset-password`, {
      method: 'POST',
      headers: apiHeader(),
      body: JSON.stringify(input)
    });
    const data1 = await fetch1.json();
    if(!fetch1.ok || fetch1.status !== 200) {
      dispatch(alertChange('Warning', data1.message, data1.errors));
      resolve(false);
    } else {
      dispatch(alertChange('Info', 'การตั้งรหัสผ่านใหม่สำเร็จแล้ว'));
      resolve(true);
    }
  });
};

export const exchangeSwapRequest = (payload ) => async (dispatch) => {
  try{
      // const responseExchangeOfPotae = await functinePtae(payload.amountCoin)
      // if ( responseExchangeOfPotae === "successful " ) {
      // } else {
      //     console.log('error')
      // }
      const responseExchangeFromBackEnd = await sendExchangeCoinService(payload)
      console.log(responseExchangeFromBackEnd)

      const payloadToCoinBalance = {
          coinAmount : responseExchangeFromBackEnd.balance,
      }
      dispatch(stateToGetCoinBalance(payloadToCoinBalance));
      // console.log(responseExchangeFromBackEnd)
      
  }
  catch(err){
      dispatch(alertChange('Danger',err));
  }
}

export const stateToGetCoinBalance = (payload) => ({
  type: USER_GET_COIN_BALANCE,
  payload
})


export const getCoinBalance = (payload, callBack) => (dispatch) => {
  getCoinBalanceService().then(
      (response) => {
          // action.payload.avatar= response.avatar
          // console.log('editProfileService success', response)
          const payload = {
              coinAmount : response.balance,
          }
          dispatch(stateToGetCoinBalance(payload));
      },
      (error) => {
          console.log('editProfileService abort', error)
      }
      );
};


export const stateToProductList = (payload) => ({
  type: USER_GET_PRODUCT_LIST,
  payload
})

export const getProductList = (callBack) => (dispatch) => {
  getProductListService().then(
      (response) => {
          callBack(response)
      },
      (error) => {
          console.log('getProductListService abort', error)
      }
      );
};

export const sentTranferRequest = (payload) => (dispatch) => {
  console.log(payload)
  sentTranferRequestService(payload).then(
      (response) => {

          // callBack(response)
          dispatch(stateToGetCoinBalance(response));
      },
      (error) => {
          console.log('getProductListService abort', error)
      }
      );
};

export const stateToEditProfile = (payload) => ({
  type: USER_EDIT_PROFILE,
  payload
})

export const editProfile = (payload, callBack) => (dispatch) => {
  const formData =new FormData();
  formData.append('avatar', payload.file)
  formData.append('firstName',payload.firstName)
  formData.append('lastName',payload.lastName)
  editProfileService(formData).then(
    (response) => {
        dispatch(stateToEditProfile(response));
        dispatch(alertChange('Success','Edit Profile successful'))
    },
    (error) => {
        console.log('editProfileService abort', error)
    }
  );
};

export const verifyEmail = (token) => async (dispatch) => {
  try {
    const res = await verifyToken(token)
    if ( res.status === 200 ) {
      await dispatch( alertChange('Info', 'verify successful'));
      return true
    }
    return false
  } catch (error) {
    return false
  }
  
}