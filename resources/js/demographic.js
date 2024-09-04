var clientData = {};

document.getElementById("voucher").style.display = "none";

document.getElementById("submitClient").addEventListener("click", function (e) {
	e.preventDefault();

	clientData["first_name"] = document.getElementById("first_name").value;
	clientData["last_name"] = document.getElementById("last_name").value;
	clientData["age"] = document.getElementById("age").value;

	var maleCheckbox = document.getElementById("male").checked;

	if (maleCheckbox) {
		clientData["sex"] = "Male";
	} else {
		clientData["sex"] = "Female";
	}

	// enable voucher form
	document.getElementById("voucher").style.display = "block";

	// disable
	document.getElementById("client").style.display = "none";
});

async function sendData(data) {

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const url = "https://omada.ishare.com.ph/api/client";

	console.log("data", data);

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				first_name: data["first_name"],
				last_name: data["last_name"],
				sex: data["sex"],
				age: data["age"],
				voucher: data["voucher"],
				mac_address: data["mac_address"],
				site_name: "Lawis, Inabanga, Bohol",
			}),
		});
		if (!response.ok) {
			console.log("response status error", response.status);
			// throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		// console.log("success", json);
	} catch (error) {
		console.error("error", error.message);
	}
}

//disable the button
function filled() {
	if (
		document.getElementById("first_name").value === "" ||
		document.getElementById("last_name").value === "" ||
		document.getElementById("age").value === ""
	) {
		document.getElementById("submitClient").disabled = true;
	} else {
		document.getElementById("submitClient").disabled = false;
	}
}

// Call filled initially to set the button state correctly on page load
document.addEventListener("DOMContentLoaded", filled);
