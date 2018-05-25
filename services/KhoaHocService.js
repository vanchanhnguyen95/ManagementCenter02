function KhoaHocService()
{
    this.LayDanhSachKhoaHoc = function()
    {
        var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc";
        return $.ajax({
            type:"GET",
            dataType:"json",
            url: urlAPI

        })
    }
}