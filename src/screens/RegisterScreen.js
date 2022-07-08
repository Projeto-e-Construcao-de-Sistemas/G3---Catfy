import { register } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { showLoading, hideLoading, showMessage, redirectUser } from '../utils';

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        let pw1 = document.getElementById('password').value;
        let pw2 = document.getElementById('repassword').value;
        e.preventDefault();
        showLoading();
        if (pw1 != pw2) {
          showMessage("As senhas devem ser iguais!");
          hideLoading();
        } else {
        const data = await register({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          repassword: document.getElementById('repassword').value,
        });
        hideLoading();
        if(data.error) {
          showMessage(data.error);
        }
        else {
          setUserInfo(data);
          redirectUser();
        }
      }});
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `

    <div class="form-container">
      <form id="register-form">
        <ul class="form-items">
          <li>
            <h1>Criar conta</h1>
          </li>
          <li>
            <label for="name">Nome</label>
            <input type="name" name="name" id="name" />
          </li>
          <li>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" />
          </li>
          <li>
            <label for="password">Senha</label>
            <input type="password" name="password" id="password"
              title="A senha deve conter entre 6 a 20 caracteres, deve conter pelo menos uma letra maiúscula,
              um número e não deve conter símbolos."
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[!@#$%^&*_=+-]).{6,20}$"/>
          </li>
          <li>
            <label for="repassword">Confirme a senha</label>
            <input type="password" name="repassword" id="repassword" />
          </li>
          <li>
            <button type="submit" class="primary">Cadastrar</button>
          </li>
          <li>
            <div>
              Já tem uma conta?
              <a href="/#/signin">Login</a>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};
export default RegisterScreen;
