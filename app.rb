require 'sinatra'

helpers do
  # Returns the number of saved TML games in our registry.
  def n_games
    0
  end
end

get '/' do
  erb :index
end

get '/editor' do
  erb :nyi
end
