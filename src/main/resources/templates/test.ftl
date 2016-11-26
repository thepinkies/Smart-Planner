<!doctype html>
<html xmlns:th="http://www.thymeleaf.org">
  <head>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
        <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
            <script src="/js/home-control.js"></script>


  </head>

  <body>

    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Sample Card</span>
            <textarea id="textarea1" class="materialize-textarea"></textarea>
              <label for="textarea1">Textarea</label>
          </div>
          <div class="card-action">
            <a class="waves-effect waves-teal btn-flat">Add Subject</a>
          </div>
        </div>
      </div>

      <section>
        <div layout="column">
           <input type="text" id="query_id"><button onclick="getSubject()">Get</button>
         <textarea id="textarea1" class="materialize-textarea"></textarea>
            <label for="status"><label id="status"></label></label>
        </div>
      </section>


    </div>



  </body>



</html>