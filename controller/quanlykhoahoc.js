$(document).ready(function () {

    //Khởi tạo đối tượng danh sách khóa học
    var danhSachKhoaHoc = new DanhSachKhoaHoc();
    //Khởi tạo đối tượng serviceKhoaHoc
    var khoaHocService = new KhoaHocService();
    //Khởi tạo đối tượng nguoiDungService
    var nguoiDungService = new NguoiDungService();

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
        //Load nội dung thẻ select trong popup
        LayDanhSachGiaoVu();
        

    }

    //Lấy danh sách Giáo vụ
    function LayDanhSachGiaoVu()
    {
        nguoiDungService.LayThongTinGiaoVu()
        .done(function(DSND){
            var noiDung = "";
            //Load danhSachNguoiDung lên thẻ select
            for(var i = 0; i < DSND.length; i++)
            {
                var nguoiDung = DSND[i];
                if(nguoiDung.MaLoaiNguoiDung === "GV")
                {
                    noiDung += `
                        <option value="${nguoiDung.TaiKhoan}">${nguoiDung.HoTen}</option>
                    `;
                }
                
            }
            $("#NguoiTao").html(noiDung);
        })
        .fail(function(error){
            console.log(error);
        });
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

    /**Thêm khóa học */
    $("body").delegate("#btnTaoMoi", "click", function(){
        //Lấy thông tin ra
        var maKH = $("#MaKH").val();
        var tenKH = $("#TenKH").val();
        var moTa = $("#MoTa").val();
        var hinhAnh = $("#HinhAnh").val();
        var luotXem = $("#LuotXem").val();
        var nguoiTao = $("#NguoiTao").val();
        //Khởi tạo đối tượng khoaHoc
        var khoaHoc = new KhoaHoc(maKH, tenKH, moTa, hinhAnh, luotXem, nguoiTao);
        khoaHocService.ThemKhoaHoc(khoaHoc)
        .done(function(result){
            console.log(result)
            window.location.reload();
        })
        .fail(function(error){
            console.log(error);
        });

    });


    CKEDITOR.replace("txtEditor");


})