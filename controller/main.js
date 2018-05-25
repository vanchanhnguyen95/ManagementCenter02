$(document).ready(function(){
    function DomID(id)
    {
        var element = document.getElementById(id);
        return element;
    }

    var arrNote = ["nhập tài khoản","aaa"];

    function Note(id,ad)
    {
        var thongBao = DomID(id);
        thongBao.style.fontSize = "12px";
        thongBao.style.color = "red";
        thongBao.innerHTML = arrNote[ad];
    }


    /**Định nghĩa sự liện click cho  nút button id=btnAddUser*/
    $("#btnAddUser").click(OpenPoupModal);

    //Xử lý cho sự kiện click
    function OpenPoupModal()
    {
        //Tạo phần nội dung modal title
        var modalTitle = "Add new user";
        //Tạo phần nội dung modalFooter dùng string template
        var modalFooter = `
            <button id="btnAdd" class="btn btn-success">Add User</button>
            <button id="btnClose" class="btn btn-danger">Close</button>
        `;

        //Dom đến thành phần HTML
        $(".modal-title").html(modalTitle);
        $(".modal-footer").html(modalFooter);

        $("#btnPopupModal").trigger("click");
    }

    /**Xử lý sự kiện cho nút đóng Form gọi nút btnClose của PopupModal */
    $("body").delegate("#btnClose", "click", function(){
        $("#btnCloseForm").trigger("click");
    });


    /**Định nghĩa sự kiện ủy nhiêm dùng delegate cho 2 button mới thêm sau */
    /**Xử lý tác vụ thêm người dùng */
    var listUser = new ListUser();
    var validate = new Validation();

    $("body").delegate("#btnAdd","click", function(){
        //Lấy thông tin người dùng nhập vào
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDT = $("#SoDT").val();
        var maLoai = $("#MaLoai").val();
        var tenLoai = $("#TenLoai").val();
        var error = 0;

        //Kiểm tra validation
        if(TestEnterEmpty("TaiKhoan","NoteTK", taiKhoan,0) == true)
        {
            error++;

        }
        if(TestEnterEmpty("MatKhau","NoteTK", matKhau,0) == true)
        {
            error++;
        }
        if(TestEnterEmpty("HoTen", "NoteTK", hoTen,0) == true)
        {
            error++;
        }
        if(TestEnterEmpty("Email", "NoteTK",email, 0) == true)
        {
            error++;
        }
        if(TestEnterEmpty("SoDT", "NoteTK", soDT, 0) == true)
        {
            error++;
        }
        if(TestEnterEmpty("MaLoai", "NoteTK", maLoai, 0) == true)
        {
            error++;
        }
        if(TestEnterEmpty("TenLoai", "NoteTK", tenLoai, 0) == true)
        {
            error++;
        }
        if(error != 0){
            return;
        }



        //Khởi tạo đối tượng user
        var user = new User(taiKhoan, matKhau, hoTen, email, soDT, maLoai, tenLoai);
        // console.log(user);
        //Đưa người dùng vào thuộc tính là mảng danh sách người dùng
        // thuộc đối tượng danh sách người dùng
        listUser.AddUser(user);
        // console.log(listUser.LU);

        //Hiển thị sweetalert
        alert("thêm thành công")

        //Gọi sự kiện đóng form
        $("#btnClose").trigger("click");
        //Reset lai form cho trống
        $(".txtF").val("");

        //Load dữ liệu ra data table
        LoadListUser(listUser.LU);

    })

    function TestEnterEmpty(ID,idTB,value,ad)
    {
        //Kiểm tra tài khoản rỗng
        var thongBao = DomID(idTB);
        if(validate.TestEmpty(value) == true)
        {
            DomID(ID).style.borderColor = "red";
            thongBao.style.fontSize = "12px";
            thongBao.style.color = "red";
            thongBao.innerHTML = arrNote[ad];
            return true;
        }
        else
        {
            DomID(ID).style.borderColor = "green";
            return false;
        }
    }

    /**Load dữ liệu ra data table */
    function LoadListUser(LU)
    {
        var contentLU = ""
        for(var i = 0 ; i < LU.length; i++)
        {
            var user = LU[i];
            contentLU += `
                <tr>
                    <td><input type="checkbox" value="${user.TaiKhoan}"/></td>
                    <td>${user.TaiKhoan}</td>
                    <td>${user.HoTen}</td>
                    <td>${user.Email}</td>
                    <td>${user.SoDT}</td>
                    <td>${user.MaLoai}</td>
                    <td>${user.TenLoai}</td>
                </tr>
            `;
            
        }
        //Dom đến table đó, truyền nội dung vào
        $("#tblBodyListUser").html(contentLU);
    }












})