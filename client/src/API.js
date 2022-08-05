const APIURL = 'http://localhost:3001/api';

async function readCourses() {
    const url = APIURL + '/courses';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const list = await response.json();
            return list;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        throw ex;
    }
}

async function readCourse(cid) {
    const url = APIURL + '/course/' + cid;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const list = await response.json();
            //console.log(list);
            return list;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        throw ex;
    }
}

async function readStdCourses(sid) {
    const url = APIURL + '/user/courses';
    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        if (response.ok) {
            const list = await response.json();
            //console.log(list);
            return list;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        throw ex;
    }
}

async function createNewStdPlan(partTime) {
  const url = APIURL + '/user/studyPlan/' + partTime;
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
            return;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        throw ex;
    }
}

async function deleteStdPlan(courses){
  const url = APIURL + '/user/studyPlan';
  try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(courses),
      });
      if (response.ok) {
          return;
      } else {
          const text = await response.text();
          throw new TypeError(text);
      }
  } catch (ex) {
      // network error
      throw ex;
  }
}

async function updateStdPlan(oldCourses, newCourses) {
  // if(newCourses.length === 0){
  //   await deleteStdPlan();
  //   return;
  // }
  const url = APIURL + '/user/update';
  try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify([oldCourses, newCourses])
      });
      if (response.ok) {
          return;
      } else {
          const text = await response.text();
          throw new TypeError(text);
      }
  } catch (ex) {
      // network error
      throw ex;
  }
}

const logIn = async (credentials) => {
    const response = await fetch(APIURL + '/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    console.log(response)
    if(response.ok) {
      const user = await response.json();
      return user;
    }
    else {
      const errDetails = await response.text();
      throw errDetails;
    }
  };
  
  const getUserInfo = async () => {
    const response = await fetch(APIURL + '/sessions/current', {
      credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      throw user;  // an object with the error coming from the server
    }
  };
  
  const logOut = async() => {
    const response = await fetch(APIURL + '/sessions/current', {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok)
      return null;
  }

const API = 
{readCourses, 
  readCourse, 
  readStdCourses, 
  createNewStdPlan,
  deleteStdPlan,
  updateStdPlan,
  logIn, 
  logOut, 
  getUserInfo
};
export default API ;