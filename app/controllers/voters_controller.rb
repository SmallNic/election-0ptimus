class VotersController < ApplicationController


  def index
    @voters = Voter.all.order(:id) #.order(:last_name, :first_name)
    @voter = Voter.new
  end

  def new
    @voters = Voter.all.order(:id) #.order(:last_name, :first_name)
    @voter = Voter.new
  end

  def create
    @voter = Voter.new(voter_params)
    if @voter.save
      render json: @voter  #this is the response for the AJAX call.
    else
      render :status => 400, :json => @voter.errors.to_json
    end
  end

  def show
    @voter = Voter.find(params[:id])
    render json: @voter
  end

  def update
    @voter = Voter.find(params[:id])
    if @voter.update(voter_params)
      render json: @voter  #this is the response for the AJAX call.
    else
      render :status => 400, :json => @voter.errors.to_json
    end
  end

  def destroy
    @voter = Voter.find(params[:id])
    @voter.destroy
    redirect_to root_path
  end

  private

  def voter_params
    params.permit(:first_name, :last_name, :address, :city, :state, :zip)
  end


end
