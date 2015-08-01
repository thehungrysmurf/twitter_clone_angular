require 'bcrypt'

class User < ActiveRecord::Base
  has_many :tweets
  has_many :followers, class_name:  "Relationship", foreign_key: "follower_id"
  has_many :following, through: :relationships, source: :followed
  
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
      token = @user.username
    else
      token = nil
    end
  end
end

