const userList = document.getElementById('userList');
const addNewUser = document.getElementById('addNewUser');
const noUsersMsg = document.getElementById('no_users');

//display users
const displayUser = (user)=>{
    const newUser = document.createElement('li');
    newUser.dataset.userId = user._id;
    newUser.innerHTML = `
    <div>
    <p>Name: <span class="userInfo">${user.name}</span></p>
    <p>Email:<span class="userInfo">${user.email}</span></p>
    <p>Phone:<span class="userInfo">${user.phone}</span></p>
    <p>Country:<span class="userInfo">${user.country}</span></p>
    <p>Is Active:<input class="userInfo" type="checkbox" id="isActive" name="isActive" ${user.isActive ? "checked" : ""}></p>
    </div>
    <div>
    <i class="fa-regular fa-pen-to-square update_user"></i>
    <i class="fa-solid fa-trash delete_user"></i>
    </div>
    `;
    userList.appendChild(newUser);
};

//load all userss when the page uploaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        let url = `http://localhost:3000/api/customer`;
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        const response = await fetch(url, options);
        const data = await response.json();
        if(data && data.success === true)
        {
            noUsersMsg.style.display = "none";
            const users = data.customers;
            users.forEach(user => {
                displayUser(user);
            });
        }else{
            noUsersMsg.style.display = "block";
            noUsersMsg.innerHTML = "No users found. Try to add new user."
        }
    } catch (error) {
        noUsersMsg.style.display = "block";
        noUsersMsg.innerHTML = `Failed to get users.`;
        console.error('Error fetching users:', error);
    }
});

//Get user
const getUser = async(id)=>{
    try {
        let url = `http://localhost:3000/api/customer/${id}`;
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while getting user:', error);
        throw error;
    }
};

//save updated user
const saveUser = async(e)=>
{
    try {
        const listItem = e.target.closest('li');
        const id = listItem.dataset.userId;
        const updatedUser = {
            name: listItem.querySelector('#name').value || null,
            email: listItem.querySelector('#email').value,
            phone:  listItem.querySelector('#phone').value || null,
            country: listItem.querySelector('#country').value,
            isActive: listItem.querySelector('#isActive').checked,
        };
        let url = `http://localhost:3000/api/customer/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser),
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (data && data.success === true) {
            const user = data.customer;
            listItem.innerHTML = `
            <div>
            <p>Name: <span class="userInfo">${user.name}</span></p>
            <p>Email:<span class="userInfo">${user.email}</span></p>
            <p>Phone:<span class="userInfo">${user.phone}</span></p>
            <p>Country:<span class="userInfo">${user.country}</span></p>
            <p>Is Active:<input class="userInfo" type="checkbox" id="isActive" name="isActive" ${user.isActive ? "checked" : ""}></p>
            </div>
            <div>
            <i class="fa-regular fa-pen-to-square update_user"></i>
            <i class="fa-solid fa-trash delete_user"></i>
            </div>
            `;
            alert('User update successfully!');
        }
        else{
            const errorsList = document.getElementById('update_errors');
            const errors = data.errors;
            errors.forEach(error => {
                const errorMsg = document.createElement('p');
                errorMsg.innerHTML = error.message;
                errorsList.appendChild(errorMsg);
            });
        }
    } catch (error) {
        console.error('Error while updating user:', error);
        throw error;
    }
};

//add new user
addNewUser.addEventListener('click',async(e)=>{
    const addUserForm = document.getElementById('addUserForm');
    if(addUserForm.style.display === "none")
    {
        addUserForm.style.display = "block";
        addNewUser.textContent = 'Save User';
    }
    else
    {
        try {
            const newUser = {
                name: addUserForm.querySelector('#name').value || null,
                email: addUserForm.querySelector('#email').value,
                phone:  addUserForm.querySelector('#phone').value || null,
                country: addUserForm.querySelector('#country').value,
                isActive: addUserForm.querySelector('#isActive').checked,
            };
            let url = `http://localhost:3000/api/customer`;
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser),
            };
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
            if(data && data.success === true)
            {
                addNewUser.textContent = 'Add New User';
                addUserForm.style.display = "none";
                displayUser(data.customer);
                alert('User added successfully.')
            }
            else{
                const errorsList = document.getElementById('errors_list');
                const errors = data.errors;
                errors.forEach(error => {
                    const errorMsg = document.createElement('p');
                    errorMsg.innerHTML = error.message;
                    errorsList.appendChild(errorMsg);
                });
            }
        } catch (error) {
            console.error('Error while adding new user:', error);
            throw error;
        }
    }
});

// Delete User
const deleteUser = async (id) => {
    try {
        let url = `http://localhost:3000/api/customer/${id}`;
        const options = { method: 'DELETE', headers: { accept: 'application/json' } };
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while deleting user:', error);
        throw error;
    }
};

//delete or update specific user
userList.addEventListener('click', async(event)=> {
    if (event.target.classList.contains('delete_user')) {
        const listItem = event.target.closest('li');
        const id = listItem.dataset.userId;
        try {
            const data = await deleteUser(id);
            if (data && data.success === true) {
                alert('Customer deleted successfully.');
                userList.removeChild(listItem);
            }else {
                alert('Error while deleting user: Unexpected server response');
            }
        } catch (error) {
            console.error('Error while deleting user:', error.message);
        }
    }
    else if (event.target.classList.contains('update_user'))
    {
        const listItem = event.target.closest('li');
        const id = listItem.dataset.userId;
        try{
            const data = await getUser(id);
            if (data && data.success === true) {
                const user = data.customer;

                listItem.innerHTML = `
                <div class="update_user">
                    <label for="name">Name: </label> 
                    <input type="text" id="name" name="name" value=${user.name}><br>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value=${user.email}><br>
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" value='${user.phone}'><br>
                    <label for="country">Country:</label>
                    <input type="text" id="country" name="country" value=${user.country}><br>
                    <label for="isActive">Is Active:</label>
                    <input type="checkbox" id="isActive" name="isActive" ${user.isActive?"checked":""}><br>
                    <div id="update_errors" class="errors_list"></div>
                    <button class="saveUserButton" onClick="saveUser(event)">Save User</button>
                </div>
                `;
            }
        }catch(error)
        {
            console.log(error);
        }
    }
});

