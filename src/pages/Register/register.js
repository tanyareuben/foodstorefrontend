import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/input";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useauth";
import styles from "../Register/register.module.css";

export default function Register() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnurl = params.get("returnurl");

  useEffect(() => {
    if (!user) return;
    returnurl ? navigate(returnurl) : navigate("/register");
  }, [user]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    await auth.register(data);
    navigate("/");
  };
  return (
    <div className={styles.login}>
      <div className={styles.authformcontainer}>
        <link
          href="https://fonts.googleapis.com/css?family=Cabin"
          rel="stylesheet"
        ></link>
        <h2>Register</h2>
        <form
          className={styles.loginform}
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <Input
            type="firstname"
            label="First Name"
            placeholder="First Name"
            {...register("firstname", {
              required: "This Field Is Required",
              minLength: {
                value: 2,
                message: "Field Is Too Short",
              },
              pattern: {
                value: /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+$/,
                message: "Name Is Not Valid",
              },
            })}
            error={errors.firstname}
          />
          <Input
            type="lastname"
            label="Last Name"
            placeholder="Last Name"
            {...register("lastname", {
              required: "This Field Is Required",
              minLength: {
                value: 2,
                message: "Field Is Too Short",
              },
              pattern: {
                value: /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+$/,
                message: "Name Is Not Valid",
              },
            })}
            error={errors.lastname}
          />

          <Input
            type="email"
            label="Email"
            placeholder="youremail@gmail.com"
            {...register("email", {
              required: "This Field Is Required",
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
              minLength: {
                value: 8,
                message: "Field Is Too Short",
              },
            })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value !== getValues("password")
                  ? "Passwords Do No Match"
                  : true,
            })}
            error={errors.confirmPassword}
          />
          <Input
            type="address"
            label="Address"
            {...register("address", {
              required: true,
              minLength: {
                value: 5,
                message: "Field Is Too Short",
              },
            })}
            error={errors.address}
          />

          <button className={styles.loginbuttons} type="submit">
            Login
          </button>
          <div className={styles.registerlink}>
            <Link to={`/login${returnurl ? "?returnurl=" + returnurl : ""}`}>
              Already have an account? Login here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
