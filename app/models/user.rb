require 'bcrypt'

class User < ActiveRecord::Base
  has_many :tweets
  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def create
    @user = User.new(params[:user])
    @user.password = params[:password]
    @user.save!
  end

  def self.login(username, pass)
    @user = User.find_by_username(username)
    if @user.password == pass
      # give_token
      return 0
    else
      return 1
      # redirect_to home_url
    end
  end
end

