var allUsers = [{nickname: "admin", password: "1234", groups: ["admin", "manager", "basic"]},
	{nickname: "sobakajozhec", password: "ekh228", groups: ["basic", "manager"]},
	{nickname: "patriot007", password: "russiaFTW", groups: ["basic"]}]
var allRights = ["manage content", "play games", "delete users", "view site"];
var allGroups = [{namegroup: 'admin', rights: ['manage content' , 'play games' , 'delete users']},
{namegroup: 'manager', rights: ['manage content']},
{namegroup: 'basic', rights: ['manage content' , 'delete users']}]
var globalX = 0;
var log = new Array();

function createUser(username, password)
{
	var arr = new Array();
    var addUser = {nickname: username, password: password, groups: arr}
    allUsers.push(addUser);
    return username;
};

function deleteUser(username)
{
	var x = false;
	if (!username)
	{
		throw new Error();
	}
	for (var i = 0; i < Object.keys(allUsers).length; i++)
	{
		if (username == allUsers[i].nickname)
		{
			allUsers.splice(i, 1);
			x = true;
		}
	}
	if (x == false)
	{
		throw new Error();
	}
};

function users() {

    var arr = new Array();
    for (var i = 0; i < Object.keys(allUsers).length; i++) {
      arr.push(allUsers[i].nickname);
    }
    return arr;
};


function createGroup()
{
	var text = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

for (var i = 0; i < 5; i++)
	text += possible.charAt(Math.floor(Math.random() * possible.length));

		var arr = new Array();
		var x = Object.keys(allGroups).length;
		var addGroup = {namegroup: text, rights: arr}
		allGroups.push(addGroup);
		for(var i in allGroups)
		{
			if (text == allGroups[i].namegroup)
			{
				return text;
			}
		}
};

function deleteGroup(group) {
	if (group)
	{	var y = false;
		for(var i in allGroups)
		{
			if (group == allGroups[i].namegroup)
			{
				y = true;
			}
		}

		if (y == false)
		{
			throw new Error();
		}
		for (var i in allGroups)
		{
			if(group == allGroups[i].namegroup)
			{
				allGroups.splice(i, 1);
			}
		}
		for(var i in allUsers)
		{
			for (var k in allUsers[i].groups)
			if(group == allUsers[i].groups[k])
			{
				allUsers[i].groups.splice(k, 1);
			}
		}

		return;
	}
	else
	{
		throw new Error();
	}
};

function groups()
{
  var arr = new Array();
  for (var i in allGroups) {
    arr.push(allGroups[i].namegroup);

  }
  return arr;
};

function addUserToGroup(username, group)
{
	if (username && group)
{	var x = false;
	var y = false;
	for(var i in allUsers)
	{		if (username == allUsers[i].nickname)
		{
			x = true;
		}
	}
	for(var i in allGroups)
	{		if (group == allGroups[i].namegroup)
		{
			y = true;
		}
	}
	if (x == false)
	{
		throw new Error();
	}
	if (y == false)
	{
		throw new Error();
	}

	var arrgroup = new Array();
	arrgroup.push(group);
	for (var i = 0; i < Object.keys(allUsers).length; i++)
	{
		if (username == allUsers[i].nickname)
		{
			for (var k in arrgroup)
			{
				allUsers[i].groups.push(arrgroup[k]);
			}
		}
	}

}
else
{
	throw new Error();
}
};


function userGroups(username)
{ var arr = new Array();
  for (var i in allUsers) {
    if (username == allUsers[i].nickname)
  {
    arr.push(allUsers[i].groups);
  }
}
return arr[0];
};

function removeUserFromGroup(username, group)
{
	if (username && group)
	{
		var x = false;
		for(var i in allUsers)
		 {		if (username == allUsers[i].nickname)
			 {
				 x = true;
			 }
		 }

		 if (x == false)
		 {
			 throw new Error();
		 }
		var arr = userGroups(username);
		var nogroup = false;
		for (var i in arr)
		{
			if(group == arr[i])
			{
				nogroup = true;
			}
		}
		if(nogroup == false)
		{
			throw new Error();
		}
		if (arr.hasOwnProperty(group))
		{
		 throw new Error();
		}
			for (var i in arr)
			{
					if (arr[i] == group)
					{
						arr.splice(i, 1);

					}
			}
			for (var i in allUsers)
			{
				if (username == allUsers[i].nickname)
				{
					allUsers[i].groups = arr;
				}
			}
		}
		else
		{
			throw new Error("username: " + username + "," + " group: " + group);
		}
};

function createRight(newRight)
{
	var name = "right " + globalX;
	var arr = rights();
	if (newRight)
	{
		arr.push(newRight);
		allRights = arr;

		return allRights[allRights.length-1];
	}
	else
	{			arr.push(name);
			allRights = arr;
			globalX++;
			return allRights[allRights.length-1];
	}

};

function deleteRight(delRight)
{
  if(delRight)
  {
		var x = false;
    for (var i = 0; i < Object.keys(allRights).length; i++) {
      if (delRight == allRights[i])
    {
      allRights.splice(i, 1);
			x = true;
    }
  }
	for (var i in allGroups)
	{
		for (var k in allGroups[i].rights)
		{
			if (delRight == allGroups[i].rights[k])
			{
				allGroups[i].rights.splice(k, 1);
			}
		}
	}
	if (x == false)
	{
		throw new Error();
	}
  }
	else
	{
		throw new Error();
	}

  return;
};

function groupRights(group)
{
	var arr = new Array();
	for (var i in allGroups)
	{
		if (group == allGroups[i].namegroup)
		{
			for(var k in allGroups[i].rights)
			{
				arr.push(allGroups[i].rights[k]);
			}

		}
	}
	return arr;
};

function rights()
{
  var arr = new Array();
  for (var i = 0; i < Object.keys(allRights).length; i++) {
    arr.push(allRights[i]);
  }
  return arr;
};

function addRightToGroup(addRight, group)
{

  if (addRight && group)
	{
			var x = false;
			var y = false;
			for(var i in allRights)
			{		if (addRight == allRights[i])
				{
					x = true;
				}
			}
			for(var i in allGroups)
			{		if (group == allGroups[i].namegroup)
				{
					y = true;
				}
			}
			if (x == false)
			{
				throw new Error();
			}
			if (y == false)
			{
				throw new Error();
			}
		for(var i in allGroups)
			{
				if (group == allGroups[i].namegroup)
				{
					allGroups[i].rights.push(addRight);
				//	return allGroups[i].rights;
				}
			}
	}
	else
	{
		throw new Error();
	}
};

function removeRightFromGroup(delRight, group)
{
	if (delRight && group)
	{
		var x = false;
			var y = false;

			for(var i in allGroups)
			{		if (group == allGroups[i].namegroup)
				{
					y = true;
				}
			}

			if (y == false)
			{
				throw new Error();
			}
		var x = false;
		for (var i in allGroups)
		{
			if (group == allGroups[i].namegroup)
			{
				for(var k in allGroups[i].rights)
				if (delRight == allGroups[i].rights[k])
				{
					allGroups[i].rights.splice(k, 1);
					x = true;
					return;
				}
				if (x == false)
				{
					throw new Error();
				}
			}
		}
	}
  else
	{
		throw new Error();
	}

};

function login(username, password)
{
	if (log[0] == null)
	{
		if (log[1] == null)
		{
			var login = false;
			var pass = false;
			for(var i in allUsers)
			{
				if (username == allUsers[i].nickname)
				{
					log[0] = username;
					login = true;
				}
			}
			for(var i in allUsers)
			{
				if (password == allUsers[i].password)
				{
					log[1] = password;
					pass = true;
				}
			}
			if (login)
			{
				if (pass)
				{
					return true;
				}
			}
		}
	}
	else
	{
		return false;
	}

};

function currentUser()
{
	if (log[0] == null)
	{
		if (log[1] == null)
		{
			return;
		}
	}
	else
	{
	return log[0];
	}




};

function logout() {
	log = new Array();
	return;
};

function isAuthorized(user, right) {
if(user && right)
{	var x = false;
	var y = false;
	for(var i in allUsers)
	{		if (user == allUsers[i].nickname)
		{
			x = true;
		}
	}
	for(var i in allRights)
	{		if (right == allRights[i])
		{
			y = true;
		}
	}
	if (x == false)
	{
		throw new Error();
	}
	if (y == false)
	{
		throw new Error();
	}
var arr = userGroups(user);
var arrRight = new Array
var x = false;
for (var i in arr)
{
	arrRight.push(groupRights(arr[i]));
}
for (var i in arrRight)
{
	for (var k in arrRight[i])
	{
		if (right == arrRight[i][k])
		{
			x = true;
		}
	}
}
if(x == true)
{
  return true;
}
else
{
  return false;
}
}
else
{
 throw new Error();
}
};
