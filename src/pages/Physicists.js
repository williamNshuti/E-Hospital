import React, { useEffect } from "react";
import { Button, Loader, Alert } from "@mantine/core";
import {
  FetchPhysicists,
  GrantAccessphysicist,
} from "../App/redux/Actions/user.action";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function Physicists() {
  const dispatch = useDispatch();
  const {
    physicists,
    physicistIsLoading,
    physicistIsError,
    grantphysicistLoading,
  } = useSelector(({ User }) => User);
  useEffect(() => {
    dispatch(FetchPhysicists());
  }, []);

  if (physicistIsLoading) {
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

  if (physicistIsError) {
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
      {physicists.length === 0 ? (
        <div className="flex h-screen justify-center items-center">
          <div className="text-center bg-gray-100 rounded-lg px-4 py-2">
            No physicists found.
          </div>
        </div>
      ) : (
        <div className="p-8">
          <h3 className="text-3xl font-bold text-center mb-8">
            Meet Our physicists
          </h3>

          <div className="flex flex-wrap justify-start">
            {physicists.map((physicist, index) => (
              <div
                key={index}
                className="max-w-md w-full mx-4 my-6 bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
              >
                <div class="flex justify-between px-4 pt-4">
                  <div class="font-semibold text-2xl text-gray-700">
                    {physicist.firstName} {physicist.lastName}
                  </div>
                  <div class="text-gray-500">{physicist.gender}</div>
                </div>
                <div class="px-4 py-2">
                  <div class="text-sm text-gray-500 mb-1">
                    {physicist.address}
                  </div>
                  <div class="text-sm text-gray-500">{physicist.email}</div>
                </div>
                <div class="px-4 py-4">
                  <Button
                    variant="outline"
                    color="blue"
                    fullWidth
                    loading={grantphysicistLoading}
                    onClick={() =>
                      dispatch(GrantAccessphysicist(physicist.email))
                        .then((response) => {
                          toast.success("Access Granted successfully!", {
                            duration: 4000,
                            position: "bottom-right",
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
                            position: "bottom-right",
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
                    {`Book ${physicist.firstName} ${physicist.lastName}`}
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

export default Physicists;
