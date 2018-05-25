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
                    <td class="MaKH">${khoaHoc.MaKhoaHoc}</td>
                    <td class="TenKH">${khoaHoc.TenKhoaHoc}</td>
                    <td class="MoTa" style="height:20px; width:20px">${khoaHoc.MoTa}</td>
                    <td class="HinhAnh"><img src="${khoaHoc.HinhAnh}" width="30" height="30"/></td>
                    <td class="LuotXem">${khoaHoc.LuotXem}</td>
                    <td class="NguoiTao">${khoaHoc.NguoiTao}</td>
                    <td><button class="btn btn-primary btnChinhSua" MaKhoaHoc="${khoaHoc.MaKhoaHoc}">Chỉnh Sửa</button></td>
                </tr>
            `;
        }

        $("#tblDanhSachKhoaHoc").html(noiDung);
    }

    /**Load ngược lên Popup chỉnh sửa */
    $("body").delegate(".btnChinhSua", "click", function(){
        //khóa input MaKH
        $("#MaKH").attr("readonly", true);
        //Clear dữ liệu textbox.txtF
        $(".txtF").val("");
        //Tạo phần nội dung modalTitle
        var modalTitle = "Chỉnh sửa khóa học";
        var modalFooter = `
            <button id="btnLuu" class="btn btn-success">Lưu</button>
            <button id="btnDong" class="btn btn-danger">Đóng</button>
        
        `;
        //Dom truyền nội dung thay đổi
        $(".modal-title").html(modalTitle);
        $(".modal-footer").html(modalFooter);

        //Load phần nội dung chỉnh sửa lên popup
        var trKhoaHoc = $(this).closest(".trKhoaHoc");
        var maKH = trKhoaHoc.find(".MaKH").html().trim();
        var tenKH = trKhoaHoc.find(".TenKH").html().trim();
        var moTa = trKhoaHoc.find(".MoTa").html().trim();
        var luotXem = trKhoaHoc.find(".LuotXem").html().trim();
        var hinhAnh = trKhoaHoc.find(".HinhAnh").find("img").attr("src");
        var nguoiTao = trKhoaHoc.find(".NguoiTao").html().trim();
        $("#MaKH").val(maKH);
        $("#TenKH").val(tenKH);
        //Dùng cú pháp để gán nội dung cho ckeditor
        CKEDITOR.instances["MoTa"].setData(moTa);
        $("#LuotXem").val(luotXem);
        $("#HinhAnh").val(hinhAnh);
        $("#NguoiTao").val(nguoiTao);
        //Gọi nút OpenPopupModal
        $("#btnPopupModal").trigger("click");


    })

    /**Lưu cập nhật khóa học */
    $("body").delegate("#btnLuu","click", function(){
        //Lấy thông tin từ giá trị từ thuộc tính người dùng thay đổi
        var maKH = $("#MaKH").val();
        var tenKH = $("#TenKH").val();
        var moTa = CKEDITOR.instances["MoTa"].getData();//Lấy giá trị từ editor
        var hinhAnh = $("#HinhAnh").val();
        var luotXem = $("#LuotXem").val();
        var nguoiTao = $("#NguoiTao").val();

        var khoaHoc = new KhoaHoc(maKH, tenKH, moTa, hinhAnh, luotXem, nguoiTao);
        khoaHocService.CapNhatKhoaHoc(khoaHoc)
        .done(function(result){
            alert("Chỉnh sửa thành công")
            console.log(result)
            window.location.reload();
        })
        .fail(function(error){
            alert("Chỉnh sửa thất bại")
            console.log(error);
        });
        
        //Mở input MaKH
        $("#MaKH").attr("readonly", false);
    });



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


    CKEDITOR.replace("MoTa", {
        allowedContent: "iframe[*]"
    });
    // CKEDITOR.replace("txtEDITOR");

})