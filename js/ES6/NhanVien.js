/**
 * Lớp đối tượng NhanVien
 * Created by DungNgo
 * Created at 5-Sep-2021
 */

class NhanVien{
    constructor(maNV, hoTen, email, matKhau, ngayLamViec, chucVu){
        this.maNV = maNV,
        this.hoTen = hoTen,
        this.email = email,
        this.matKhau = matKhau,
        this.ngayLamViec = ngayLamViec,
        this.chucVu = chucVu,

        //tạo mảng đối chiếu để sau này dễ dàng duyệt mảng khi cần
        this.mangDoiChieu = [this.maNV, this.hoTen, this.email, this.ngayLamViec, this.chucVu]
        
        // switch(this.chucVu){
        //     case 1:
        //         this.chucVu = "Sếp"
        //         break;
        //     case 2:
        //         this.chucVu = "Trưởng Phòng"
        //         break;
        //     case 3:
        //         this.chucVu = "Nhân Viên"
        // }
    }
}
