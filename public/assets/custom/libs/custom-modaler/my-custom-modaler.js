
class MyCustomModaler {

    clear(views) {
        document.querySelectorAll(views).forEach(view => {
            view.innerHTML = "";
        })
    }

    make(views, type, icon, title, message, timeOut) {
        this.clear(views);
        let bgType = type == "success" ? "secondary" : type;
        setTimeout(() => {
            document.querySelectorAll(views).forEach(view => {
                view.innerHTML = `<div class="alert alert-${bgType} alert-dismissible">
                                    <h5 class="text-${type}">
                                        <em class="icon ni ni-${icon}"></em> 
                                        ${title}
                                    </h5>
                                    <p>${message}</p>
                                    <button class="close" data-bs-dismiss="alert"></button>
                                </div>`;
            })
    
            if (timeOut != null) {
                setTimeout(() => {
                    MyCustomModaler.clear(views);
                }, timeOut);
            }
        }, 100);
    }
}