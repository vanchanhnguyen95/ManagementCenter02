function NguoiDungService()
{
    this.LayThongTinGiaoVu = function()
    {
        var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/danhsachNguoiDung";
        return $.ajax({
            type:"GET",
            dataType:"json",
            url: urlAPI
        });
    
    }
}