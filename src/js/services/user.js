//import address from "../utils/constants.js";

import { events } from "../utils/eventData.js";

export async function loginUser(loginData) {
  try {
    const response = await fetch("http://localhost:8080/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud de inicio de sesión");
    }

    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    const token = localStorage.getItem("token");
    console.log(token);

    return data; // Retorna los datos obtenidos
  } catch (error) {
    console.log(error);
    throw error; // Lanza el error para que sea manejado externamente
  }
}
export async function generateCode(email) {
  const respuesta = await fetch("http://localhost:8080/sendcode", {
    headers: {
      email: email,
    },
    method: "POST",
  });
  const data = await respuesta.json();
  return data.message;
}

export async function validateCode(email, code) {
  const url =
    "http://localhost:8080/validateCode?email=" + email + "&code=" + code;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      localStorage.setItem("tokenRecovery", jsonResponse.tokenRecovery);
      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
}
export async function changePassword(newPassword) {
  const url = "http://localhost:8080/changePassword";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPassword),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);

      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getAllEvents() {
  const url = "http://localhost:8080/AllEvents";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los eventos");
    }

    const json = await response.json();
    events.event = ["kj"];
    console.log(events + "klllll");
    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAllNews() {
  const url = "http://localhost:8080/AllNewsAdmin";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los eventos");
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAllActivities() {
  const url = "http://localhost:8080/AllActivitiesAdmin";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los eventos");
    }

    const json = await response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function createEvent(event) {
  const url = "http://localhost:8080/createEvent";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(event),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);

      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
}
export async function updateEvent(event) {
  const url = "http://localhost:8080/updateEvent";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(event),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);

      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function createNews(news) {
  const url = "http://localhost:8080/createNews";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(news),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);

      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function updateNews(news) {
  const url = "http://localhost:8080/updateNews";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(news),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);

      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
}
export async function createActivity(activity) {
  const url = "http://localhost:8080/createActivity";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(activity),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);

      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
}
export async function updateActivity(activity) {
  const url = "http://localhost:8080/updateActivity";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(activity),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la respuesta del servidor.");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);

      return jsonResponse;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function deleteEvent(idEvent) {
  const respuesta = await fetch("http://localhost:8080/deleteEvent", {
    headers: {
      idEvent: idEvent,
      token: localStorage.getItem("token"),
    },
    method: "POST",
  });
  const data = await respuesta.json();
  return data.message;
}
export async function deleteActivity(idActivity) {
  const respuesta = await fetch("http://localhost:8080/deleteActivity", {
    headers: {
      idActivity: idActivity,
      token: localStorage.getItem("token"),
    },
    method: "POST",
  });
  const data = await respuesta.json();
  return data.message;
}
export async function deleteNews(idNews) {
  const respuesta = await fetch("http://localhost:8080/deleteNews", {
    headers: {
      idNews: idNews,
      token: localStorage.getItem("token"),
    },
    method: "POST",
  });
  const data = await respuesta.json();
  return data.message;
}
export async function getNewsContent(url) {
  try {
    console.log(url)
    const response = await fetch("http://localhost:8080"+url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los eventos");
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export default loginUser;
