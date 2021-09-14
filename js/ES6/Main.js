var congTy = new CongTy();
var validator = new Validator();

var nhanVien_1 = new NhanVien("1", "Ngo Dung", "ndung1206@gmail.com", "1206", "10/07/2017", 1);
var nhanVien_2 = new NhanVien("2", "Luan Dang", "dang_luan@gmail.com", "1234", "23/12/2018", 3);
var nhanVien_3 = new NhanVien("3", "Ngo Ngoc Dung", "ndung126", "1206", "10/07/2017", 2);
var nhanVien_4 = new NhanVien("d", "Han Sara", "sara@gmail.com", "1206", "10/07/2017", 3);
var nhanVien_5 = new NhanVien("e", "Pham Bang Bang", "bingbing@gmail.com", "1234", "23/12/2018", 1);
var nhanVien_6 = new NhanVien("f", "Song Hye Kyo", "Song@gmail.com", "1206", "10/07/2017", 3);
var nhanVien_7 = new NhanVien("g", "Tieu Yen Tu", "ennho@gmail.com", "1234", "23/12/2018", 2);
var nhanVien_8 = new NhanVien("h", "Satoshi", "satoshi@gmail.com", "1206", "10/07/2017", 2);

congTy.ThemNhanVien(nhanVien_1);
congTy.ThemNhanVien(nhanVien_2);
congTy.ThemNhanVien(nhanVien_3);
congTy.ThemNhanVien(nhanVien_4);
congTy.ThemNhanVien(nhanVien_5);
congTy.ThemNhanVien(nhanVien_6);
congTy.ThemNhanVien(nhanVien_7);
congTy.ThemNhanVien(nhanVien_8);

console.log(congTy.danhSachNhanVien);

// hàm gọi modal popup
showModal = (modal_title, readonly = false, type = 1) => {
    // lấy title hiển thị ra HTML
    document.getElementById('header-title').innerHTML = modal_title;
    // msnv: chỉnh sửa được khi Thêm, ko chỉnh sửa được khi Sửa
    document.getElementById('msnv').readOnly = readonly;
    //type:1 Thêm nhân viên, type:2 sửa nhân viên
    switch (type) {
        case 1: //Thêm nhân viên --> hiển thị nút Thêm
            document.getElementById("btnThemNV").style.display = "block";
            document.getElementById("btnCapNhat").style.display = "none";
            break;
        case 2: // Sửa nhân viên --> hiển thị nút Cập nhật
            document.getElementById("btnThemNV").style.display = "none";
            document.getElementById("btnCapNhat").style.display = "block";
            break;
    }

}

// xóa nội dung đã input vào form, tiện cho lần nhập tiếp theo
deleteInfo = () => {
    // lấy ra tất cả ô input
    let eles = document.getElementsByTagName("input");
    console.log(eles);
    //duyệt mảng
    for (let ele of eles) {
        //cho giá trị về rỗng
        ele.value = "";
    }
    //riêng ô option set về selecteđInex = 0
    document.getElementById("chucvu").selectedIndex = 0;
}



// hiển thị danh sách không phân trang
// hienThiDanhSach = (dsnv) => {
//     let tbody = document.getElementById('tableDanhSach');
//     tbody.innerHTML = "";
//     let nhanvien, tr;

//     for (let i = 0; i < dsnv.length; i++) {
//         nhanvien = dsnv[i];
//         tr = document.createElement('tr');
//         tbody.appendChild(tr);

//         for (let j = 0; j < nhanvien.mangDoiChieu.length; j++) {    
//             let td = document.createElement('td');
//             td.innerHTML = nhanvien.mangDoiChieu[j];
//             tr.appendChild(td);  

//         }

//         let suaBtn = `<a class="btn btn-primary text-white" data-toggle="modal" href="#myModal" id="sua_${nhanvien.maNV}"><em class="fa fa-pencil"></em></a>`;
//         let xoaBtn = `<a class="btn btn-danger text-white ml-2" id="xoa_${nhanvien.maNV}"><em class="fa fa-trash"></em></a>`;
//         let td = document.createElement('td');
//         td.innerHTML = suaBtn + xoaBtn;
//         tr.appendChild(td);

//         suaNhanVien("sua_" + nhanvien.maNV);

//         xoaNhanVien("xoa_" + nhanvien.maNV);

//     }
// }

// hiển thị danh sách có phân trang
let trangHienTai = 1;

// hiển thị danh sách có phân trang
hienThiDanhSach = (list) => {
    // lấy ra tbody và cho nó = rỗng để đổ danh sách cần hiển thị vào
    let tbody = document.getElementById('tableDanhSach');
    tbody.innerHTML = "";

    let nhanvien, tr;

    //lấy cái ul phân trang, cho bằng rỗng
    let ulPhanTrang = document.getElementById('ulPhanTrang');
    ulPhanTrang.innerHTML = "";
    //tạo biến đếm số nhân viên trong danh sách cần hiển thị
    let soNhanVien = list.length;
    // tạo biến số dòng hiển thị mỗi trang
    let soDongMoiTrang = 3;
    // tạo biến số trang
    let soTrang = Math.ceil(soNhanVien / soDongMoiTrang);

    // lặp và hiển thị trang vào thẻ a
    for (let i = 1; i <= soTrang; i++) {
        //tạo biến li để append vào ul
        let li = document.createElement('li');
        li.setAttribute('class', 'page-item');
        ulPhanTrang.appendChild(li);
        // tạo biến a để append vào li
        let a = document.createElement('a');
        // setattribute bootstrap cho biến a
        a.setAttribute('class', 'page-link');
        // setattribute id trang cho biến a 
        a.setAttribute('id', `trang_${i}`);
        // append a vào li
        a.innerHTML = i;
        li.appendChild(a);

        // phần hiển thị danh sách từng trang
        chuyenTrang(`trang_${i}`);
    }



    // tạo biến chạy từ nhân viên đầu trang đến nhân viên cuối trang
    let batDau = (trangHienTai - 1) * soDongMoiTrang;
    let ketThuc = trangHienTai * soDongMoiTrang;
    if (ketThuc < soDongMoiTrang) {
        ketThuc = soDongMoiTrang;
    }


    for (let i = batDau; i < ketThuc; i++) {
        //từng nhân viên hiển thị trong từng trang
        nhanvien = list[i]
        // tạo hàng cho mỗi nhân viên
        tr = document.createElement('tr');
        tbody.appendChild(tr);


        // lấy từ thuộc tính của từng nhân vien ra hiển thị vào từng ô
        for (let j = 0; j < nhanvien.mangDoiChieu.length; j++) {
            let td = document.createElement('td');
            td.innerHTML = nhanvien.mangDoiChieu[j];
            tr.appendChild(td);
        }

        // làm icon sửa/ xóa mỗi dòng nhân viên
        // thêm vào ô cuối mỗi hàng nên code phải để cuối, và trong vòng for ngang hàng với chỗ tạo tr

        let suaBtn = `<a class="btn btn-primary text-white" data-toggle="modal" href="#myModal" id="sua_${nhanvien.maNV}"><em class="fa fa-pencil"></em></a>`;
        let xoaBtn = `<a class="btn btn-danger text-white ml-2" id="xoa_${nhanvien.maNV}"><em class="fa fa-trash"></em></a>`;

        let td = document.createElement('td');
        td.innerHTML = suaBtn + xoaBtn;
        tr.appendChild(td);

        suaNhanVien("sua_" + nhanvien.maNV);

        xoaNhanVien("xoa_" + nhanvien.maNV);

    }
}

//kiểm tra validate và lấy thông tin nhân viên khi hợp lệ
layThongTinNhanVien = (isAdd) => { // isAdd: true: dung cho thêm nv, false: dùng cho cập nhật
    //Dom tới các ô input lấy value
    let maNV = document.getElementById('msnv').value;
    let hoTen = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let matKhau = document.getElementById('password').value;
    let ngayLamViec = document.getElementById('datepicker').value;
    let chucVu = document.getElementById('chucvu').selectedIndex;

    let isValid = true;

    //mã nv
    if (isAdd) {
        isValid &=
            validator.isRequired(maNV, "tbMaNV", "Không được để trống") &&
            validator.isNumber(maNV, "tbMaNV", "Mã nhân viên phải là số") &&
            validator.isAvailable(congTy.danhSachNhanVien, maNV, "tbMaNV", "mã nhân viên đã tồn tại")
    }
    // kiem tra tên
    isValid &=
        validator.isRequired(hoTen, "tbTen", "Không được để trống") &&
        validator.isValidName(hoTen, "tbTen", "Phải là tên hợp lệ");

    //kiểm tra email
    isValid &=
        validator.isRequired(email, "tbEmail", "Không được để trống") &&
        validator.isEmail(email, "tbEmail", "Nhập email hợp lệ");

    // kiểm tra mật khẩu
    isValid &=
        validator.isRequired(matKhau, "tbMatKhau", "Không được để trống") &&
        validator.isPassword(matKhau, "tbMatKhau", "Mât khẩu phải gồm chữ hoa, chữ thường, số, ký tự ĐB, độ dài 8-32")

    // kiểm tra ngày làm
    isValid &=
        validator.isDate(ngayLamViec, "tbNgay", "Hãy chọn ngày");

    // kiểm tra chọn chức vụ
    isValid &=
        validator.isChecked("chucvu", "tbChucVu", "Hãy chọn chức vụ")

    if (isValid) {
        let nhanVien = new NhanVien(maNV, hoTen, email, matKhau, ngayLamViec, chucVu)
        return nhanVien;


    } return null;

}

// Thêm nhân viên và hiển thị danh sách ra màn hình
// dom tới nút thêm
document.getElementById('btnThem').addEventListener('click', () => {
    deleteInfo();
    showModal("THÊM NGƯỜI DÙNG");
});

// Nút thêm sau khi đã nhập các thông tin cần thiết
document.getElementById('btnThemNV').addEventListener('click', () => {
    // validation (làm sau)


    //    lấy các thông tin đã nhập vào ô input
    // let maNV = document.getElementById('msnv').value;
    // let hoTen = document.getElementById('name').value;
    // let email = document.getElementById('email').value;
    // let matKhau = document.getElementById('password').value;
    // let ngayLamViec = document.getElementById('datepicker').value;
    // let chucVu = document.getElementById('chucvu').selectedIndex;

    let nhanvien = layThongTinNhanVien(true); // thêm nhân viên nên isAdd = true

    //tạo biến chứa nhân viên mới
    // let nhanVienMoi = new NhanVien(maNV, hoTen, email, matKhau, ngayLamViec, chucVu);
    // var nhanVienMoi = layThongTinNhanVien(true);

    // thêm nhân viên mới vào mảng danh sách nhân viên của công ty
    congTy.ThemNhanVien(nhanvien);

    //hiện alert thông báo thành công
    if (nhanvien) {
        swal("Thêm người dùng thành công", "Danh sách đã được cập nhật", "success");
    }
    // hiển thị ra danh sách
    hienThiDanhSach(congTy.danhSachNhanVien);
})

// Sửa nhân viên

// tạo hàm sửa nhân viên cho nút Sửa
suaNhanVien = (btnIdSua) => {

    document.getElementById(btnIdSua).addEventListener('click', () => {
        // tách mã nv từ id của nút sửa
        // tạo biến chứa id của nút
        let id = btnIdSua;
        // tách lấy mã nv chứa vào mảng split
        let mangTam = id.split('_');
        // lấy mã nv từ phần tử thứ 2 của mảng
        let manv = mangTam[1];

        // tìm nhân viên trong danh sách theo mã
        let nhanvien = congTy.TimNhanVienTheoMa(manv);

        // lấy thông tin nhân viên đổ ra modal
        document.getElementById('msnv').value = manv;
        document.getElementById('name').value = nhanvien.hoTen;
        document.getElementById('email').value = nhanvien.email;
        document.getElementById('password').value = nhanvien.matKhau
        document.getElementById('datepicker').value = nhanvien.ngayLamViec;
        document.getElementById('chucvu').selectedIndex = nhanvien.chucVu;


        showModal("Cập nhật người dùng", true, 2);

    })
}

document.getElementById('btnCapNhat').addEventListener('click', () => {
    // let maNV = document.getElementById('msnv').value;
    // let hoTen = document.getElementById('name').value;
    // let email = document.getElementById('email').value;
    // let matKhau = document.getElementById('password').value;
    // let ngayLamViec = document.getElementById('datepicker').value;
    // let chucVu = document.getElementById('chucvu').selectedIndex;

    let nhanvien = layThongTinNhanVien(false); // không phải thêm mới nên isAdd = false

    congTy.SuaNhanVien(nhanvien);

    //hiện alert thông báo thành công
    if (nhanvien) {
        swal("Sửa thành công", "Danh sách đã được cập nhật", "success");
    }
    // hiển thị ra danh sách
    hienThiDanhSach(congTy.danhSachNhanVien);

});

// Icon xóa nhân viên
xoaNhanVien = (btnIdXoa) => {
    document.getElementById(btnIdXoa).addEventListener('click', () => {
        swal({
            title: "Bạn có chắc chắn xóa?",
            text: "Một khi đã xóa sẽ không khôi phục được!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let id = btnIdXoa;
                    let mangTam = id.split('_');
                    let manv = mangTam[1];
                    congTy.XoaNhanVien(manv);
                    // hiển thị ra danh sách
                    hienThiDanhSach(congTy.danhSachNhanVien);

                    swal("Xóa thành công!", {
                        icon: "success",
                    });
                } else {
                    swal("Dữ liệu vẫn được bảo toàn!");
                }
            });
    })
}

//Tìm nhân viên
// cách1: không cần bấm nút tìm, nhập từ khóa hiển thị ra kết quả
document.getElementById('searchName').addEventListener('keyup', () => {
    let tuKhoa = document.getElementById('searchName').value;
    let dskq = congTy.TimNhanVienTheoTen(tuKhoa);
    hienThiDanhSach(dskq.danhSachNhanVien);

})

// cách2: nhập từ khóa vào ô search, sau đó bấm nút tìm mới hiển thị ra kq
// document.getElementById('btnTimNV').addEventListener('click',()=>{
//     let tuKhoa = document.getElementById('searchName').value;
//     let dskq = congTy.TimNhanVienTheoTen(tuKhoa);
//     hienThiDanhSach(dskq.danhSachNhanVien);
// })

//Sắp xếp tăng theo mã nhân viên
document.getElementById('SapXepTang').addEventListener('click', () => {
    document.getElementById('SapXepTang').style.display = "none";
    document.getElementById('SapXepGiam').style.display = "inline-block";
    congTy.SapXepNhanVien(1);
    hienThiDanhSach(congTy.danhSachNhanVien);
})

//Sắp xếp giảm theo mã nhân viên
document.getElementById('SapXepGiam').addEventListener('click', () => {
    document.getElementById('SapXepGiam').style.display = "none";
    document.getElementById('SapXepTang').style.display = "inline-block";
    congTy.SapXepNhanVien(-1);
    hienThiDanhSach(congTy.danhSachNhanVien);
})

//Chuyển trang
chuyenTrang = (btnId) => {
    document.getElementById(btnId).addEventListener('click', () => {
        let id = btnId;
        let mangTam = id.split('_');
        trangHienTai = mangTam[1];
        hienThiDanhSach(congTy.danhSachNhanVien);
    });
}

hienThiDanhSach(congTy.danhSachNhanVien);
