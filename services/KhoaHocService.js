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
    this.ThemKhoaHoc = function(khoaHoc)
    {
        var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc";
        return $.ajax({
            type: "POST",
            dataType: "json",
            url: urlAPI,
            data: khoaHoc
            
        })
    }
}