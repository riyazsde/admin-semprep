import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const CustomModal = ({
  show,
  onHide,
  title,
  bodyContent,
  footerButtons,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyContent}</Modal.Body>
      {/* <Modal.Footer>
        {footerButtons?.map((btn, index) => (
          <Button
            key={index}
            variant={btn.variant || "primary"}
            onClick={btn.onClick}
          >
            {btn.label}
          </Button>
        ))}
      </Modal.Footer> */}
    </Modal>
  );
};

export const UniversalForm = ({
  formFields,
  initialData,
  onSubmit,
  mode = "view",
  onSelectChange = () => {},
}) => {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [currentMode, setCurrentMode] = useState(mode);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
    if (onSelectChange) onSelectChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentMode === "view") return;

    const newErrors = {};
    formFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
      setErrors(newErrors);
    } else {
      setErrors({});
      if (onSubmit) onSubmit(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {formFields.map((field, index) => {
        switch (field.type) {
          case "text":
          case "email":
          case "password":
          case "number":
            return (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>{field.label}</Form.Label>
                {currentMode === "view" ? (
                  <div className="form-control-plaintext">
                    {/* {formData[field.name] || "-"} */}
                    <Form.Control
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || "-"}
                      disabled={true}
                    />
                  </div>
                ) : (
                  <Form.Control
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    isInvalid={!!errors[field.name]}
                    disabled={field.disabled}
                  />
                )}
                {currentMode !== "view" && (
                  <Form.Control.Feedback type="invalid">
                    {errors[field.name]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            );

          case "textarea":
            return (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>{field.label}</Form.Label>
                {currentMode === "view" ? (
                  <div className="form-control-plaintext">
                    {/* {formData[field.name] || "-"} */}
                    <Form.Control
                      as="textarea"
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || "-"}
                      disabled={true}
                    />
                  </div>
                ) : (
                  <Form.Control
                    as="textarea"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    isInvalid={!!errors[field.name]}
                    disabled={field.disabled}
                  />
                )}
                {currentMode !== "view" && (
                  <Form.Control.Feedback type="invalid">
                    {errors[field.name]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            );

          case "select":
            return (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>{field.label}</Form.Label>
                {currentMode === "view" ? (
                  <div className="form-control-plaintext">
                    {/* {field.options.find(
                      (option) => option.value === formData[field.name]
                    )?.label || "-"} */}
                    <Form.Control
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      isInvalid={!!errors[field.name]}
                      disabled={true}
                    />
                  </div>
                ) : (
                  <Form.Select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    isInvalid={!!errors[field.name]}
                    disabled={field.disabled}
                  >
                    <option value="" disabled>
                      {field.placeholder || "Select an option"}
                    </option>
                    {field.options.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                )}
                {currentMode !== "view" && (
                  <Form.Control.Feedback type="invalid">
                    {errors[field.name]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            );

          case "checkbox":
            return (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>{field.label}</Form.Label>
                {currentMode === "view" ? (
                  <div className="form-control-plaintext">
                    {formData[field.name] ? "Yes" : "No"}
                  </div>
                ) : (
                  <Form.Check
                    type="checkbox"
                    label={field.label}
                    name={field.name}
                    checked={formData[field.name] || false}
                    onChange={handleChange}
                    disabled={field.disabled}
                  />
                )}
              </Form.Group>
            );

          case "radio":
            return (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>{field.label}</Form.Label>
                {currentMode === "view" ? (
                  <div className="form-control-plaintext">
                    {field.options.find(
                      (option) => option.value === formData[field.name]
                    )?.label || "-"}
                  </div>
                ) : (
                  field.options.map((option, optIndex) => (
                    <Form.Check
                      key={optIndex}
                      type="radio"
                      id={`${field.name}_${optIndex}`}
                      name={field.name}
                      label={option.label}
                      value={option.value}
                      checked={formData[field.name] === option.value}
                      onChange={handleChange}
                      disabled={field.disabled}
                    />
                  ))
                )}
              </Form.Group>
            );

          case "file":
            return (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>{field.label}</Form.Label>
                {currentMode === "view" ? (
                  <div className="form-control-plaintext">
                    {/* {formData[field.name]?.name || "-"} */}
                    {(field.label === "Image" ||
                      field.label === "thumbnail") && (
                      <p className="d-flex align-items-center justify-content-center">
                        <img
                          src={formData[field.name] || initialData?.thumbnail}
                          alt="ad"
                          style={{ maxWidth: "300px", maxHeight: "300px" }}
                        />
                      </p>
                    )}
                    {console.log(formData[field.name])}
                  </div>
                ) : (
                  <Form.Control
                    type="file"
                    id={field.name}
                    name={field.name}
                    onChange={handleChange}
                    isInvalid={!!errors[field.name]}
                    disabled={field.disabled}
                  />
                )}
                {currentMode !== "view" && (
                  <Form.Control.Feedback type="invalid">
                    {errors[field.name]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            );

          case "date":
            return (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>{field.label}</Form.Label>
                {currentMode === "view" ? (
                  <div className="form-control-plaintext">
                    {/* {new Date(formData[field.name]).toLocaleDateString() || "-"} */}
                  </div>
                ) : (
                  <Form.Control
                    type="date"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]?.slice(0, 10) || ""}
                    onChange={handleChange}
                    isInvalid={!!errors[field.name]}
                    disabled={field.disabled}
                  />
                )}
                {currentMode !== "view" && (
                  <Form.Control.Feedback type="invalid">
                    {errors[field.name]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            );

          default:
            return null;
        }
      })}
      {currentMode !== "view" && (
        <Button variant="primary" type="submit">
          Submit
        </Button>
      )}
    </Form>
  );
};
