<div id="nav">
        <div class="nav-logged nav-logged-in">
            <div class="nav-logged-in-section">
                <div class="instance-selects">
                <instance-selects
                        :instance="instance"
                        :gamer="gamer"
                        v-for="instance in instances"></instance-selects>
                </div>
            </div>
            <div class="nav-logged-in-section">
                <gamer :gamer="gamer"
                       :schematics="schematics"></gamer>

                <div onclick="document.getElementById('nav').className = 'animated bounceOutUp'" class="navHide"><img src="img/nav.png"></div>
            </div>
        </div>
</div>
<div onclick="document.getElementById('nav').style.display='flex';document.getElementById('nav').className = 'animated bounceInDown'" class="navShow"><img src="img/nav.png"></div>
