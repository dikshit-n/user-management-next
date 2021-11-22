import React from "react";
import Field from "./field";

const RecursiveContainer = ({
  config,
  formik,
  validationSchema,
  className,
  formContainer = null,
}) => {
  // To understand the formContainer prop
  // formContainer = {
  //   component: ExampleComponent, // this prop is a component that is used to wrap the recursivecontainer form within it. (like shown below in the return statement)
  //   props: exampleProps
  // }
  if (config) config = config.filter((el) => el);
  const FormContainer = formContainer?.component;
  const recursiveContainer = (
    <div className={className}>
      {config.map((c) => {
        return (
          <Field {...c} formik={formik} validationSchema={validationSchema} />
        );
      })}
    </div>
  );

  return FormContainer ? (
    <FormContainer
      {...formContainer.props}
      form={recursiveContainer} // recursiveContainer form is given to use your own styles and functionalities by wrapping it inside your own elements.
    />
  ) : (
    recursiveContainer
  );
};

export default RecursiveContainer;
