import { useState, useCallback } from "react";

function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  function handleChange(e) {
    let { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: e.target.validationMessage }));
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  const handleSubmit = (onSubmit) => (event) => {
    event.preventDefault();
    onSubmit(values);
  }

  const hendleReset = useCallback(function reset(values = {}, errors = {}, isFormValid = false) {
    setValues(values);
    setErrors(errors);
    setIsFormValid(isFormValid);
  }, []);

  return { values, errors, isFormValid, handleChange, handleSubmit, hendleReset };
}

export default useForm;
