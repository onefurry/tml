require 'sinatra'

get '/' do
  erb :index
end

get '/editor' do
  erb :nyi
end
