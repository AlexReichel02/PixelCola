from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   ##means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__)

@auth.route('/', methods=['GET', 'POST'])
@login_required
def home():
    return render_template("home.html", user=current_user)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('auth.home'))
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email does not exist.', category='error')

    return render_template("login.html", user=current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')


        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists.', category='error')
        elif len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character.', category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(
                password1, method='sha256'),score=0,level=0)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            return redirect(url_for('auth.home'))

    return render_template("sign_up.html", user=current_user)

@auth.route('/update_score', methods=['POST'])
def update_score():
    new_score = request.form.get('score')
    temp = int(new_score)

    current_user.score += temp

    if current_user.score > 10:
                current_user.level = 1

    if current_user.score > 20:
                current_user.level = 2

    if current_user.score > 30:
                current_user.level = 3

    if current_user.score > 40:
                current_user.level = 4

    if current_user.score > 50:
                current_user.level = 5


    db.session.commit()
    flash('Score updated!', category='success')
    return jsonify(score=current_user.score,level=current_user.level)

@auth.route('/game', methods=['GET', 'POST'])
@login_required
def game():
    return render_template("game.html", user=current_user)
   
@auth.route('/gameV2', methods=['GET', 'POST'])
@login_required
def gameV2():
    return render_template("gamev2.html", user=current_user)

@auth.route('/gameV3', methods=['GET', 'POST'])
@login_required
def gameV3():
    return render_template("gamev3.html", user=current_user)

@auth.route('/leaderBoard', methods=['GET', 'POST'])
@login_required
def leaderBoard():
    leaderBoard_data = User.query.order_by(User.score.desc()).all()
    return render_template('leaderboard.html', leaderBoard_data=leaderBoard_data,user=current_user)
 