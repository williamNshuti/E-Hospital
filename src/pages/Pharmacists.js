import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FetchPharmacists,
  GrantAccessPharmacist,
} from "../App/redux/Actions/user.action";
import { Button, Loader, Alert } from "@mantine/core";
import toast, { Toaster } from "react-hot-toast";

function Pharmacists() {
  const dispatch = useDispatch();
  const {
    pharmacists,
    pharmacistIsLoading,
    pharmacistIsError,
    grantpharmacistLoading,
  } = useSelector(({ User }) => User);
  useEffect(() => {
    dispatch(FetchPharmacists());
  }, []);

  if (pharmacistIsLoading) {
    return (
      <div
        style={{
          marginTop: "100px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        <Loader style={{ marginTop: "100px" }} />{" "}
      </div>
    );
  }

  if (pharmacistIsError) {
    return (
      <Alert
        color="red"
        title="Error"
        style={{ marginTop: "100px", textAlign: "center" }}
      >
        Failed to fetch pharmacists data. Please try again later.
      </Alert>
    );
  }

  return (
    <div>
      {pharmacists.length === 0 ? (
        <div className="flex h-screen justify-center items-center">
          <div className="text-center bg-gray-100 rounded-lg px-4 py-2">
            No pharmacists found.
          </div>
        </div>
      ) : (
        <div className="p-8">
          <h3 className="text-3xl font-bold text-center mb-8">
            Meet Our Pharmacists
          </h3>
          <div className="flex flex-wrap justify-start">
            {pharmacists.map((pharmacist) => (
              <div
                key={pharmacist.email}
                className="max-w-md w-full mx-4 my-6 bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
              >
                <div className="flex justify-between px-4 pt-4">
                  <div className="font-semibold text-2xl text-gray-700">
                    {pharmacist.firstName} {pharmacist.lastName}
                  </div>
                  <div className="text-gray-500">{pharmacist.gender}</div>
                </div>
                <div className="px-4 py-2">
                  <div className="text-sm text-gray-500 mb-1">
                    {pharmacist.address}
                  </div>
                  <div className="text-sm text-gray-500">
                    {pharmacist.email}
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Button
                    variant="outline"
                    color="blue"
                    fullWidth
                    loading={grantpharmacistLoading}
                    onClick={() =>
                      dispatch(GrantAccessPharmacist(pharmacist.email))
                        .then((response) => {
                          toast.success("Access Granted successfully!", {
                            duration: 4000,
                            position: "top-center",
                            style: {
                              borderRadius: "10px",
                              background: "#4CAF50",
                              color: "#fff",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                              filter: "brightness(90%)",
                            },
                            iconTheme: {
                              primary: "#fff",
                              secondary: "#333",
                            },
                          });
                        })
                        .catch((error) => {
                          toast.error(`Access Granted  failed : ${error}`, {
                            duration: 4000,
                            position: "top-center",
                            style: {
                              borderRadius: "10px",
                              background: "#4CAF50",
                              color: "#fff",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                              filter: "brightness(90%)",
                            },
                            iconTheme: {
                              primary: "#fff",
                              secondary: "#333",
                            },
                          });
                        })
                    }
                  >
                    {`Book ${pharmacist.firstName} ${pharmacist.lastName}`}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Toaster />
        </div>
      )}
    </div>
  );
}

export default Pharmacists;
