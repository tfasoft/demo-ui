const forms = {
  authentication: {
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter email",
      secure: false,
    },
    password: {
      type: "text",
      label: "Password",
      placeholder: "Enter password",
      secure: true,
    },
  },
  commonSettings: {
    name: {
      type: "text",
      label: "Name",
      placeholder: "Enter Name",
      secure: false,
    },
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter email",
      secure: false,
    },
  },
  securitySettings: {
    password: {
      type: "text",
      label: "Password",
      placeholder: "Enter password",
      secure: true,
    },
  },
  telegramAuth: {
    userToken: {
      type: "text",
      label: "Token",
      placeholder: "Enter your token",
      secure: false,
    },
  },
  reportBug: {
    title: {
      type: "text",
      label: "Title",
      placeholder: "Enter bug title",
      secure: false,
    },
    content: {
      type: "textarea",
      label: "Details",
      placeholder: "Enter bug details",
      secure: false,
    },
  },
  enableAuth: {
    tid: {
      type: "text",
      label: "Telegram ID",
      placeholder: "Enter your Telegram ID",
      secure: false,
    },
  },
};

export default forms;
