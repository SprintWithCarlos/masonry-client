export const registerCall = async (userCredentials, dispatch) => {
  const { username, email, password } = userCredentials;
  try {
    const res = await fetch("auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    if (res.status !== 200) {
      const error = await res.json();
      throw new Error(error.message);
    }
    const data = await res.json();
    // return data;
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
export const loginCall = async (userCredentials, dispatch) => {
  try {
    const res = await fetch("auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userCredentials),
    });
    if (res.status !== 200) {
      const error = await res.json();
      throw new Error(error.message);
    }
    const data = await res.json();
    // return data;
    dispatch({ type: "LOGIN_SUCCESS", payload: data._id });
    // setTimeout(() => {
    // }, 10000);
    window.location.replace("/");
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
export const uploadPhoto = async (data) => {
  try {
    const res = await fetch(`/upload`, {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const createPost = async (payload) => {
  try {
    const { desc, imgURL, userId } = payload;
    const res = await fetch(`/posts/${userId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        desc,
        imgURL,
      }),
    });
    const data = await res.json();
    window.location.reload();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const likePost = async (payload) => {
  const { userId, postId } = payload;
  try {
    const res = await fetch(`/posts/${postId}/like`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getProfileData = async (userId) => {
  const res = await fetch(`/users/${userId}/profile`);
  const data = await res.json();
  return data;
};
export const followCall = async (userId, username) => {
  try {
    const res = await fetch(`/users/follow/${userId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
