import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useauth";
import { useSearchParams, Link } from "react-router-dom";
import styles from "../Login/login.module.css";
import Input from "../../components/Input/input";

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnurl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;

    returnurl ? navigate(returnurl) : navigate("/login");
  }, [user, navigate, returnurl]);

  const submit = async ({ email, password }) => {
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.authformcontainer}>
        <link
          href="https://fonts.googleapis.com/css?family=Cabin"
          rel="stylesheet"
        ></link>
        <h2>Login</h2>
        <form
          className={styles.loginform}
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <Input
            type="email"
            label="Email"
            placeholder="youremail@gmail.com"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: "Email Is Not Valid",
              },
            })}
            error={errors.email}
          />
          <Input
            type="password"
            label="Password"
            placeholder="********"
            {...register("password", {
              required: true,
            })}
            error={errors.password}
          />

          <button className={styles.loginbuttons} type="submit">
            Login
          </button>
          <div className={styles.registerlink}>
            <Link to={`/register${returnurl ? "?returnurl=" + returnurl : ""}`}>
              Don't have a customer account? Register here.
            </Link>
          </div>
          <br></br>
          <div>
            <Link
              to={`/ManagerMainPage/managerregister${
                returnurl ? "?returnurl=" + returnurl : ""
              }`}
            >
              Admin Register Page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
