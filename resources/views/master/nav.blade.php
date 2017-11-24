<div id="nav">
    @if (Auth::guest())
        <form v-if="login" class="form-horizontal" method="POST" action="{{ route('login') }}">
            {{ csrf_field() }}
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" name="email" type="email" value="{{ old('email') }}" placeholder="Email" required>
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                      <i class="fa fa-check"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" name="password" type="password" placeholder="Password" required>
                    <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button type="submit" class="button is-success">
                        Login
                    </button>
                    <label class="checkbox">
                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}>
                        Remeber Me
                    </label>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <a class="btn btn-link" href="{{ route('password.request') }}">
                        Forgot Your Password?
                    </a>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <a @click.prevent="login=false" class="btn btn-link" href="">
                       Create Account
                    </a>
                </p>
            </div>

        </form>
        <form v-if="!login" class="form-horizontal" method="POST" action="{{ route('register') }}">
            {{ csrf_field() }}
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" name="name" type="text" placeholder="User Name" required>
                    <span class="icon is-small is-left">
                      <i class="fa fa-user-circle"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" name="email" type="email" value="{{ old('email') }}" placeholder="Email" required>
                    <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                       <i class="fa fa-check"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" name="password" type="password" placeholder="Password" required>
                    <span class="icon is-small is-left">
                       <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">

            </div>
            <div class="field">
                <p class="control">
                    <button type="submit" class="button is-success">
                        Create Account
                    </button>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <a @click.prevent="login=true" class="btn btn-link" href="">
                        Log In
                    </a>
                </p>
            </div>
        </form>
    @else
        <a class="btn btn-link" href="{{ url('/logout') }}">
            Log Out
        </a>
        <gamer></gamer>
    @endif
    <div onclick="document.getElementById('nav').className = 'animated bounceOutUp'" class="navHide">Hide It</div>
</div>
<div onclick="document.getElementById('nav').className = 'animated bounceInDown'" class="navShow">Show It</div>
