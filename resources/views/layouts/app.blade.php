<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/login.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    JSurvey
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ms-auto">
                        <!-- Authentication Links -->
                        @guest
                        @if (Route::has('login'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                        </li>
                        @endif

                        @if (Route::has('register'))
                        <!-- <li class="nav-item">
                            <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                        </li> -->
                        @endif
                        @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                {{ Auth::user()->name }}
                            </a>

                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </div>
                        </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <div class="box-form" style='margin-top: 20px; height: 500px'}}>
                <div class="left">
                    <div class="overlay">
                        <h1>Joyn Software.</h1>
                        <p>Powered By JoynDigital</p>

                    </div>
                </div>


                <div class="right">
                    <h5>Login</h5>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <div class="inputs">
                        <form method="POST" action="{{ route('login') }}">
                            @csrf
                            <input placeholder="email" id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                            <br />
                            <input placeholder="password" id="password" type="password" name="password" required autocomplete="current-password">

                            <br />
                            <br>
                            <br>
                            <button type="submit" class='LoginButton'>
                                {{ __('Login') }}
                            </button>
                        </form> 
                        <!-- <input type="text" placeholder="user name" onChange={(e) => this.usernametyping(e)} /> -->
                        
                        <!-- <input type="password" placeholder="password" onChange={(e) => this.passwordtyping(e)} /> -->
                    </div>

                   
                    <!-- <button className='LoginButton' onClick={() => this.loginClicked()}>Login</button> -->
                </div>

            </div>
    </div>
</body>

</html>