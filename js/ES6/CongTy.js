/**
 * Lớp đối tượng CongTy
 * Created by DungNgo
 * Created at 5-Sep-2021
 */

class CongTy{
    constructor(){
        this.danhSachNhanVien = new Array;
    };
    //phương thức thêm nhân viên mới vào mảng this.danhSachNhanVien
    ThemNhanVien(nhanVienMoi){
        // this.danhSachNhanVien.push(nhanVienMoi) --> ES5
        this.danhSachNhanVien = [...this.danhSachNhanVien, nhanVienMoi]; //-->ES6
    };
    // phương thức tìm vị trí nhân viên theo mã nhân viên, trả về vị trí trong mảng
    TimViTriTheoMa(manv){
        for(let vitri in this.danhSachNhanVien){
            if(this.danhSachNhanVien[vitri].maNV === manv){
                return vitri;
                break;
            }
        }
    };
    //phương thức tìm nhân viên theo mã nhân viên, trả về nhân viên
    TimNhanVienTheoMa(manv){
        for(let nhanVien of this.danhSachNhanVien){
            if(nhanVien.maNV === manv){
                return nhanVien;
                break;
            }
        }
    };
    // phương thức xóa nhân viên theo mã
    XoaNhanVien(manv){
        //lấy ra vị trí của nhân viên cần xóa
        let vitri = this.TimViTriTheoMa(manv);
        console.log(vitri);
        // dùng splice để xóa 1 phần tử từ vi trí vừa lấy được
        this.danhSachNhanVien.splice(vitri,1);
    };
    SuaNhanVien(nhanvien){
        // cho user nhập vào thông tin nhanvien mới
        //lấy ra vị trí của nhân viên cần xóa
        let vitri = this.TimViTriTheoMa(nhanvien.maNV);
        console.log(vitri);
        //thay thế giá trị bằng nhanvien mới tại vị trí vừa lấy được
        this.danhSachNhanVien[vitri] = nhanvien;
    };
    TimNhanVienTheoTen(hoten){
        // tạo biến để hứng kết quả tìm được, nó sẽ giống với cái danhSachNhanVien, là thể hiện của CongTy
        let danhSachKetQua = new CongTy();
        //cắt khoảng trắng đầu cuối, đưa về uppercase hoặc lowercase
        hoten = hoten.trim().toUpperCase();
        //vòng for of để duyệt qua từng phần tử, so sánh tên nhập vào và tên từng phần tử
        for(let nhanvien of this.danhSachNhanVien){
            // lấy hoTen từng nhân viên ra
            let hotenNV = nhanvien.hoTen;
            //cắt khoảng trắng đầu cuối, đưa về uppercase hoặc lowercase
            hotenNV = hotenNV.trim().toUpperCase();
            //tìm bằng hàm search, nếu không có trả về -1
            // nếu có, thêm nhanvien tìm được vào mảng danhSachNhanVien của danhSachKetQua
            if(hotenNV.search(hoten) !== -1){
              danhSachKetQua.danhSachNhanVien = [...danhSachKetQua.danhSachNhanVien, nhanvien];
            }
        }
        // trả về mảng danhSachKetQua
        return danhSachKetQua;
    };

    //Sắp xếp nhân viên
    SapXepNhanVien = (type) =>{ //quy dinh type 1 la tang, type -1 la giam
        //Sap xep tang; 
        if(type === 1){
            this.danhSachNhanVien.sort((a,b)=>{
                let x = a.maNV.toLowerCase();
                let y = b.maNV.toLowerCase();
                if(x<y) return -1;
                if(x>y) return 1;
                return 0;
            });
        }
        // sap xep giam
        else{
            this.danhSachNhanVien.sort((a,b)=>{
                let x = a.maNV.toLowerCase();
                let y = b.maNV.toLowerCase();
                if(x<y) return 1;
                if(x>y)return -1;
                return 0;
            })
        }

    }


}