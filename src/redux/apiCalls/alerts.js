// import {
//   getAleretStart,
//   getAleretSuccess,
//   getAleretFailure,
//   createAleretStart,
//   createAleretSuccess,
//   createAleretFailure,
// } from "../slice/alert";
// import axios from "axios";

// export const createAlert = async (dispatch, conversation) => {
//   dispatch(createAleretStart());
//   try {
//     const res = await axios.post(
//       "http://localhost:5000/operator/transfer",
//       conversation
//     );
//     dispatch(createAleretSuccess(res.data));
//   } catch (err) {
//     dispatch(createAleretFailure());
//   }
// };
