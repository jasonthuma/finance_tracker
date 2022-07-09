import React, { useEffect } from "react";
import { FaListAlt } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../hooks/redux/hooks";

import { Spinner } from "react-bootstrap";
import TransactionHistory from "../components/TransactionHistory";
import { useNavigate } from "react-router-dom";
import {
  getTransactions,
  resetTransactionResponse,
} from "../redux/transactions/transactionSlice";

const History: React.FC = () => {
  const { transactionLoading, transactionSuccess, transactionChanged } =
    useAppSelector((state) => state.transactionReducer);
  const { user, jwt } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (jwt && transactionChanged) {
      dispatch(getTransactions(jwt));
    }
  }, [jwt, transactionChanged, dispatch]);
  useEffect(() => {
    if (transactionChanged || transactionSuccess) {
      dispatch(resetTransactionResponse());
    }
  }, [transactionChanged, transactionSuccess, dispatch]);

  if (transactionLoading) {
    return (
      <div className="container app-body py-5">
        <div className="container">
          <div className="text-center">
            <h1>
              <Spinner animation="border" /> Fetching Transaction History
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
          <h1>
            <FaListAlt /> Transaction History
          </h1>
        </div>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-8">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default History;
