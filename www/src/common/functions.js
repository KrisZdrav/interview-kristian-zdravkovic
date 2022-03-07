import M from "materialize-css";

export const showSnackbar = (msg, variant) => {
  M.Toast.dismissAll();
  M.toast({
    html: `${msg}`,
    displayLength: 1300,
    classes: `${variant === "error" ? "red" : "green"} white-text`,
    outDuration: 0.5,
  });
};
