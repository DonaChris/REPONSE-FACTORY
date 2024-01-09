<?php
$routes = [];
foreach (Route::getRoutes() as $rou) {
    $routeName = $rou->getName();
    if (!empty(trim($routeName)) && !in_array($routeName, $routes)) {
        $routes[$rou->getName()] = $rou->uri();
    }
}

// Ajouter du lien précedent (encore appelé orrigin)
$routes['url-previous'] = url()->previous();
$env_required = ['APP_URL', 'ASSET_URL'];
$envArray = [];
foreach ($env_required as $key) {
    $envArray[$key] = env($key);
}
$env = json_encode($envArray);
?>

<script>
    let assetUrl = "<?php echo asset(''); ?>" + "/";
    let routeBase = "<?php echo env('APP_URL'); ?>" + "/";
    let routeArray = JSON.parse('<?php echo json_encode($routes); ?>');
    let envArray = JSON.parse(`<?php echo $env; ?>`);

    // ENV
    function jsEnv(envName) {
        let envVariable = "";
        if (envArray.hasOwnProperty(envName)) {
            envVariable = envArray[envName];
        }

        return envVariable;
    }
    // ASSET
    function jsAsset(uri) {
        return assetUrl + uri;
    }
    // ROUTE
    function jsRoute(routeName, param = null) {
        let link = "";
        if (routeArray.hasOwnProperty(routeName)) {
            // Si le lien ne contient pas le prefixe http
            if (!(routeArray[routeName]).includes("http")) {
                link = routeBase;
            }
            link += routeArray[routeName];
        }
        // param
        if (param != null) {
            Object.keys(param).forEach(key => {
                link = link.replace("{" + key + "}", param[key]);
            })
        }
        return link;
    }

    function jsRouteQuery(routeName, param = null) {
        if (param != null) {
            switch (typeof param) {
                case 'object':
                    return jsRoute(routeName) + "?" + new URLSearchParams(param).toString();
                    break;

                case 'array':
                    return jsRoute(routeName) + "?" + param.join("&");
                    break;
            }
        }
        return jsRoute(routeName);
    }

    function jsRouteParams(routeName, paramsObject) {
        let query = "";
        if (Object.keys(paramsObject).length > 0) {
            Object.keys(paramsObject).forEach(key => {
                let symbol = query == "" ? "?" : "&";
                query += symbol + key + "=" + paramsObject[key];
            })
        }
        return jsRoute(routeName) + query;
    }
</script>
