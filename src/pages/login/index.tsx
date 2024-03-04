import {
  Button,
  Container,
  TextField,
  Divider,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "media/img/popcorn.jpg";
import { useUser } from "hooks/useUser";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { User } from "context/user/slice";

const Login = () => {
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
    keepLoggedin: true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleKeepLoggedinChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;

    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmitLogin: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const loggedInUser: User = {
        username: formData.username,
        password: formData.password,
        keepLoggedin: formData.keepLoggedin,
      };
      setUser(loggedInUser);
      navigate("/");
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container component="main" maxWidth="md">
        <div className="grid grid-cols-1 h-full border shadow-md sm:grid-cols-2">
          <div className="flex items-center justify-center w-full h-full">
            <div>
              <img src={loginImage} className="w-full h-full" alt="Login" />
            </div>
          </div>
          <div>
            <div className="bg-white p-8 h-full">
              <form onSubmit={handleSubmitLogin}>
                <FormControl className="flex gap-2" fullWidth>
                  <Divider>
                    <div className="font-bold text-lg"> Log In</div>
                  </Divider>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    error={!!errors.username}
                    helperText={errors.username}
                    onChange={handleLoginChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleLoginChange}
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Divider />
                  <div>
                    <div className="flex items-center justify-start">
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleKeepLoggedinChange}
                            checked={formData.keepLoggedin}
                            name="keepLoggedin"
                            color="primary"
                          />
                        }
                        label="keep me logged in"
                        className="select-none"
                      />
                    </div>
                    <FormHelperText error>{errors.general}</FormHelperText>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Sign In
                    </Button>
                  </div>
                </FormControl>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
