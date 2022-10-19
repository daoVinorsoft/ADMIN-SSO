/**
 * @author [daoNguyen]
 * @email [daonds@vinorsoft.com ]
 * @create date 2022-10-13 16:20:10
 * @modify date 2022-10-13 16:20:10
 * @desc [description]
 */
# Version 
    Angular CLI: 13.1.4
    Node: 16.14.2
    Package Manager: npm 8.5.0
# Build file dist
 - Chạy lệnh sau để tiến hành build source code.
        `$ npm run build-dev`
 - Sau khi đã build thành công -> nén zip folder dist được sinh ra khi chạy lệnh build xong và push lên git.
# Deploy code 
 - Connet vào đường dẫn chứa source tiến hành pull code và giải nén file dist.zip đã được push lên sau khi build.
        `$ git pull `
        `$ unzip -o dist.zip`

 
