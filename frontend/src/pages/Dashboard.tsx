import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux/hooks";
import { FaUniversity } from "react-icons/fa";
import { Balance } from "../components/Balance";
import { useAppDispatch } from "../hooks/redux/hooks";
import {
  getTransactions,
  resetTransactionResponse,
} from "../redux/transactions/transactionSlice";
import { Alert, Spinner } from "react-bootstrap";
import RecentTransactionHistory from "../components/RecentTransactionHistory";
import { IncomeExpenses } from "../components/IncomeExpenses";
import { CreateTransaction } from "../components/CreateTransaction";
import { resetAuthResponse } from "../redux/auth/authSlice";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //Local State
  const [alertMessage, setAlertMessage] = useState("");
  //Global State
  const { user, jwt, authSuccess, authMessage, authError } = useAppSelector(
    (state) => state.authReducer
  );
  const {
    transactions,
    transactionLoading,
    transactionChanged,
    transactionSuccess,
    transactionError,
    transactionMessage,
  } = useAppSelector((state) => state.transactionReducer);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (authError) {
      setAlertMessage(authMessage);
      dispatch(resetAuthResponse());
    }
    if (transactionError) {
      setAlertMessage(transactionMessage);
      dispatch(resetTransactionResponse);
    }
  }, [
    user,
    transactionMessage,
    authMessage,
    authError,
    transactionError,
    navigate,
    dispatch,
  ]);
  useEffect(() => {
    if ((jwt && transactionChanged) || (jwt && authSuccess)) {
      dispatch(getTransactions(jwt));
    }
  }, [jwt, transactionChanged, authSuccess, dispatch]);
  useEffect(() => {
    if (transactionChanged || transactionSuccess) {
      dispatch(resetTransactionResponse());
    }
    if (authSuccess) {
      dispatch(resetAuthResponse());
    }
  }, [transactionChanged, transactionSuccess, authSuccess, dispatch]);

  if (transactionLoading) {
    return (
      <div className="container app-body py-5">
        <div className="container">
          <div className="text-center">
            <h1>
              <Spinner animation="border" /> Loading Dashboard
            </h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container app-body py-5">
      <div className="container">
        <div className="text-center">
          {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}
          <h1>
            <FaUniversity /> Dashboard
          </h1>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 my-4">
            <Balance transactions={transactions} />
            <IncomeExpenses transactions={transactions} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <CreateTransaction />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-10">
            <RecentTransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
