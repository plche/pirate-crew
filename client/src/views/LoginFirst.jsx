import {Link} from "react-router-dom";

const LoginFirst = () => {
  return (
    <div>You need to <Link to='/login'>login</Link> first...</div>
  );
}

export default LoginFirst;
