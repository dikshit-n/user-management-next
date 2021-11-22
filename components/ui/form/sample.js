export default [
  {
    type: "text",
    name: "name",
    label: "User's name",
    style: {
      color: "green",
      margin: "10px",
    },
    fieldProps: {},
  },
  {
    type: "number",
    name: "number",
    label: "User's age",
    style: {
      color: "green",
      margin: "10px",
    },
  },
  {
    type: "array",
    name: "user",
    children: [
      {
        type: "text",
        name: "user.hobbies",
        label: "User's hobbies",
        style: {
          color: "green",
          margin: "10px",
        },
        fieldProps: {},
      },
      {
        type: "text",
        name: "user.os",
        label: "User's operating system",
        style: {
          color: "green",
          margin: "10px",
        },
      },
    ],
  },
];
