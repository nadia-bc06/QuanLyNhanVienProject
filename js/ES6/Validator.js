function Validator() {
	// kiểm tra rỗng
	this.isRequired = function(inputValue, thongBaoId, message) {
		if (inputValue === '') {
			document.getElementById(thongBaoId).style.display = 'block';
			document.getElementById(thongBaoId).innerHTML = message;
			return false;
		} else {
			return true;
		}
	};
	//kiểm tra trùng
	this.isAvailable = function(arr, inputValue, thongBaoId, message) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].maNV === inputValue) {
				document.getElementById(thongBaoId).style.display = 'block';
				document.getElementById(thongBaoId).innerHTML = message;
				return false;
			}
		}
		return true;
	};
	//kiem tra chuoi
	this.isValidName = function(inputValue, thongBaoId, message) {
		let nameRegex =
			'^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
			'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
			'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$';
		if (inputValue.match(nameRegex)) {
			return true;
		}
		document.getElementById(thongBaoId).style.display = 'block';
		document.getElementById(thongBaoId).innerHTML = message;
		return false;
	};
	// kiem tra do dai chuoi
	this.lengthCheck = function(inputValue, thongBaoId, message, min, max) {
		if (inputValue.length >= min && inputValue.length <= max) {
			return true;
		}
		document.getElementById(thongBaoId).style.display = 'block';
		document.getElementById(thongBaoId).innerHTML = message;
		return false;
	};
	//kiem tra email
	this.isEmail = function(inputValue, thongBaoId, message) {
		let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (inputValue.match(emailRegex)) {
			return true;
		} else {
			document.getElementById(thongBaoId).style.display = 'block';
			document.getElementById(thongBaoId).innerHTML = message;
			return false;
		}
	};
	//kiểm tra mật khẩu hợp lệ
	//Phải có chữ thường, chữ hoa, ký tự đặc biệt, số, độ dài 8-32
	this.isPassword = function(inputValue, thongBaoId, message) {
		let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/;
		if (inputValue.match(passwordRegex)) {
			return true;
		} else {
			document.getElementById(thongBaoId).style.display = 'block';
			document.getElementById(thongBaoId).innerHTML = message;
			return false;
		}
	};
	// kiểm tra đã chọn chức vụ chưa
	this.isChecked = function(radioId, thongBaoId, message) {
		if (document.getElementById(radioId).selectedIndex !== 0) {
			return true;
		} else {
			document.getElementById(thongBaoId).style.display = 'block';
			document.getElementById(thongBaoId).innerHTML = message;
			return false;
		}
	};
	//kiểm tra ngày mm/dd/yyy
	this.isDate = function(inputValue, thongBaoId, message) {
		let dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
		if (inputValue.match(dateRegex)) {
			return true;
		} else {
			document.getElementById(thongBaoId).style.display = 'block';
			document.getElementById(thongBaoId).innerHTML = message;
			return false;
		}
	};
	//kiểm tra số
	this.isNumber = function(inputValue, thongBaoId, message) {
		let numberRegex = /^[0-9]+$/;
		if (inputValue.match(numberRegex)) {
			return true;
		} else {
			document.getElementById(thongBaoId).style.display = 'block';
			document.getElementById(thongBaoId).innerHTML = message;
			return false;
		}
	};
}
