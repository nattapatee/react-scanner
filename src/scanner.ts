declare var Dynamsoft: any;
declare var EnumDWT_ImageType: any;
declare var EnumDWT_ConvertMode: any;

export class Scanner {

    constructor() {
    }

    getObject() {
        var DWObject = Dynamsoft.WebTwainEnv.GetWebTwain("dwtcontrolContainer")
        return DWObject;
    }

    onSuccess() { }
    onFailure() { }

    init() {
        var DWObject = this.getObject();
        if (DWObject) {
            DWObject.Width = 200;
            DWObject.Height = 800;
            DWObject.ShowImageEditor("dwtcontrolContainerLargeViewer", 750, 800);
            DWObject.SetViewMode(1, 4); // Set the view mode to 1 by 4

            DWObject.Addon.PDF.SetResolution(300);
            DWObject.Addon.PDF.SetConvertMode(EnumDWT_ConvertMode.CM_RENDERALL);

            DWObject.ShowPageNumber = true;
        }
    }

    uploadLocalImage() {
        var DWObject = this.getObject();
        if (DWObject) {
            DWObject.IfShowFileDialog = true;
            DWObject.LoadImageEx("", EnumDWT_ImageType.IT_ALL, this.onSuccess, this.onFailure);
        }
    }

    scan() {
        var DWObject = this.getObject();
        DWObject.IfDisableSourceAfterAcquire = true
        DWObject.SelectSource()
        DWObject.OpenSource()
        DWObject.AcquireImage()
    }

    insertHttpImage() {
        var DWObject = this.getObject();
        DWObject.HTTPDownload("media.comicbook.com", "/2018/05/hot-toys-avengers-infinity-war-doctor-strange-1110356.jpeg");
    }

    public uploadPdfToServer() {
        var fileName = "HelloWorld.pdf";
        var DWObject = this.getObject();
        DWObject.HTTPPort = "5000"
        DWObject.HTTPUploadAllThroughPostAsPDF(
            "localhost",
            "/api/upload/uploadFile",
            fileName,
            (result) => {
                console.log(result);
            },
            (err) => {
                console.error(err)
            }
        )
    }

    insertLocalImage() {
        var DWObject = this.getObject();
        DWObject.IfAppendImage = false;
        DWObject.IfShowFileDialog = true;
        DWObject.LoadImageEx("", EnumDWT_ImageType.IT_ALL, this.onSuccess, this.onFailure);
    }
}