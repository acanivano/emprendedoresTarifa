var mapMain;

require([
        "esri/map",

        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "dojo/dom",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "esri/dijit/HomeButton",
        "esri/dijit/Scalebar",
        "esri/layers/FeatureLayer",
        "esri/tasks/QueryTask",
        "esri/tasks/query",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "dijit/form/Select"],
    function (Map,
              ready,
              parser,
              on,
              dom,
              BorderContainer,
              ContentPane,
              HomeButton,
              Scalebar,
              FeatureLayer,
              QueryTask,
              Query,
              SimpleMarkerSymbol,
              SimpleLineSymbol,
              Color) {


        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

            
        // Create the map
            mapMain = new Map("cpCenter", {
                basemap: "topo",
                center: [-5.61094, 36.016],
                zoom: 15
            });//map

            var home = new HomeButton({
            map: mapMain
            }, "HomeButton");
            home.startup();//homebutton

            var scalebar = new Scalebar({
            map: mapMain,
            scalebarUnit: "dual"
            });//scalebar


            on(select, "change", function(evt){
            // Recojo el valor del select
                var SeleccLocal = dom.byId("select").value;
            // Muestro el valor seleccionado del select en el id=opcion
                var muestraopcion = dom.byId("opcion");
              muestraopcion.innerHTML = SeleccLocal;

            //Define a query, after that I will create a Feature Layer
                var query = new Query();
                query.where = "Tienda = " + "SeleccLocal";
                query.returnGeometry = true;   


            //create a new symbol
                var marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255,0,0]), 1),
                new Color([0,255,0,0.25]));

            
            //Create a FeatureLayer with a query selection
                var localOSM = new FeatureLayer(locales);
                localOSM.selectFeatures(query,FeatureLayer.SELECTION_NEW);


            //add the symbol into feature layer
                localOSM.setSelectionSymbol(marker);

            //add Feature Layer
                map.addLayer(localOSM);

            });//on select      
                       
        });//ready
});//requiere        

       
                

          

       