# single view and route that you will layer angular on top of

get '/' do
  erb :index
end

get '/users' do
  users = User.all
  myself = session['user']
  content_type :json
  { :users => users, :myself => myself }.to_json
end

post '/users' do
  user = JSON.parse(request.body.read)
  User.create(first_name: user['first_name'], last_name: user['last_name'], username: user['username'], password: user['password'])
end

# Perform authentication, establish session if successful
post '/login' do
    credentials = JSON.parse(request.body.read)
    is_logged_in = User.login(credentials['username'], credentials['password'])
    if is_logged_in != nil
      status = 200
      session['user'] = is_logged_in
    else
      status = 400
      session['user'] = nil
    end
    { :status => status }.to_json
end

# Get logged-in user's profile
get '/home' do
  if session['user'].nil?
    status = 404
  else
    status = 200
    current_user = User.find_by_username(session['user'])
  content_type :json
  { :status => status, :current_user => current_user }.to_json
  end
end

# Log the user out
get '/logout' do
  session['user'] = nil
  redirect to '/'
end

# Post a tweet
post '/tweet' do
  if session['user'].nil?
    status = 404
  else
    tweet = JSON.parse(request.body.read)
    Tweet.create(username: session['user'], text: tweet['text']);
  end
end

# Get the profile page of :id
get '/profile/:id' do
  user = User.find_by_id(params['id'])
  content_type :json
  user.to_json 
end

# Get tweets of :id
get '/tweets/:id' do
  user = User.find_by_id(params['id'])
  tweets = Tweet.where(:username => user.username)
  content_type :json
  tweets.to_json
end

# Get a list of users who are following :id
get '/followers/:id' do
  user = User.find_by_id(params['id'])
  followers_array = Array.new();
  relationships = Relationship.where(:followed_id => user.id).all
  relationships.each {
    |f|
    follower = User.find_by_id(f.follower_id)
    followers_array << follower.username
  }
  content_type :json
  return followers_array.to_json
end

# Get a list of users who are followed by :id
get '/following/:id' do
  user = User.find_by_id(params['id'])
  following_array = Array.new();
  relationships = Relationship.where(:follower_id => params['id']).all
  relationships.each {
    |f|
    followed = User.find_by_id(f.followed_id)
    following_array << followed.username
  }
  content_type :json
  return following_array.to_json
end

# Is the logged-in user following :id ?
get '/follow/:id' do
  followed = User.find_by_id(params['id'])
  puts "followed " + followed.username
  follower = User.find_by_username(session['user'])
  puts "follower " + follower.username
  is_follower = Relationship.where(:follower_id => follower.id, :followed_id => followed.id).first
  if is_follower
    following = true
  else
    following = false
  end
  return following.to_s
end

# Follow a user
post '/follow/:id' do
  followed = User.find_by_id(params['id'])
  follower = User.find_by_username(session['user'])
  Relationship.create(follower_id: follower.id, followed_id: followed.id)
end
