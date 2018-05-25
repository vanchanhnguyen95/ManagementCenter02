$(document).ready(function () {

    //Khởi tạo đối tượng danh sách khóa học
    var danhSachKhoaHoc = new DanhSachKhoaHoc();
    //Khởi tạo đối tượng serviceKhoaHoc
    var khoaHocService = new KhoaHocService();

    LoadDanhSachKhoaHoc()

    function LoadDanhSachKhoaHoc(){
        khoaHocService.LayDanhSachKhoaHoc()
        .done(function(DSKH){
            danhSachKhoaHoc.DSKH = DSKH;
            //Load khóa học lên data table
            LoadTableDanhSachKhoaHoc(danhSachKhoaHoc.DSKH);
        })
        .fail(function(error){
            console.log(error);
        })
        

    }

    function LoadTableDanhSachKhoaHoc(DSKH)
    {
        var noiDung = "";
        for(var i = 0; i < DSKH.length; i++)
        {
            var khoaHoc = DSKH[i];
            noiDung += `
                <tr class="trKhoaHoc">
                    <td><input type="checkbox" class="ckbMaKH" value="${khoaHoc.MaKH}" /></td>
                    <td>${khoaHoc.MaKhoaHoc}</td>
                    <td>${khoaHoc.TenKhoaHoc}</td>
                    <td>${khoaHoc.LuotXem}</td>
                    <td>${khoaHoc.HinhAnh}</td>
                    <td>${khoaHoc.LuotXem}</td>
                    <td><img src="${khoaHoc.NguoiTao}" width="50" height="50" /></td>
                </tr>
            `;
        }

        $("#tblDanhSachKhoaHoc").html(noiDung);
    }


    $("#btnThemKH").click(OpenPopupModal);
    //Xử lý cho sự kiện click đó
    function OpenPopupModal() {
        //Clear dữ liệu textbox.txtF
        $(".txtF").val("");
        //Tạo phần bội dung Modal title
        var modalTitle = "Thêm Khóa học";
        //Tạo nội dung cho modalFooter: dùng string tamplate
        var modalFooter = `
            <button id="btnTaoMoi" class="btn btn-success">Tạo mới</button>
            <button id="btnDong" class="btn btn-danger">Đóng</button>
        `;

        //Dom gán dữ liệu vào
        $(".modal-title").html(modalTitle);
        $(".modal-footer").html(modalFooter);
        //Gọi nút open modal
        $("#btnPopupModal").trigger("click");
    }
})