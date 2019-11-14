var documenterSearchIndex = {"docs":
[{"location":"man/plotting/#Plotting-1","page":"Plotting","title":"Plotting","text":"","category":"section"},{"location":"man/plotting/#","page":"Plotting","title":"Plotting","text":"Plotting currently supports (through Plots and StatsPlots) heatmap (for the values of a single layer), density and histogram (for the non-NaN values), as well as scatter and histogram2d for two layers. All usual options for plots apply.","category":"page"},{"location":"man/types/#Types-1","page":"Types","title":"Types","text":"","category":"section"},{"location":"man/types/#","page":"Types","title":"Types","text":"Layers are represented by a grid, storing the content of cells in a Matrix, and a bounding box indicated by the floating point coordinates of its limits.","category":"page"},{"location":"man/types/#Abstract-type-1","page":"Types","title":"Abstract type","text":"","category":"section"},{"location":"man/types/#","page":"Types","title":"Types","text":"SimpleSDMLayer","category":"page"},{"location":"man/types/#SimpleSDMLayers.SimpleSDMLayer","page":"Types","title":"SimpleSDMLayers.SimpleSDMLayer","text":"All types in the package are part of the abstract type SimpleSDMLayer. A SimpleSDMLayer has five core fields: grid is a matrix storing the cells, and left, right, bottom and top are floating point numbers specifying the bounding box.\n\nIt is assumed that the missing values will be represented as NaN, so the \"natural\" type for the values of grid are floating points, but it is possible to use any other type T by having grid contain Union{T,Float64} (for example).\n\n\n\n\n\n","category":"type"},{"location":"man/types/#Implemented-types-1","page":"Types","title":"Implemented types","text":"","category":"section"},{"location":"man/types/#","page":"Types","title":"Types","text":"SimpleSDMResponse\nSimpleSDMPredictor","category":"page"},{"location":"man/types/#SimpleSDMLayers.SimpleSDMResponse","page":"Types","title":"SimpleSDMLayers.SimpleSDMResponse","text":"A response is a SimpleSDMLayer that is mutable, and is the usual type to store analysis outputs. You can transform a response into a predictor using convert.\n\n\n\n\n\n","category":"type"},{"location":"man/types/#SimpleSDMLayers.SimpleSDMPredictor","page":"Types","title":"SimpleSDMLayers.SimpleSDMPredictor","text":"A predictor is a SimpleSDMLayer that is immutable, and so does not have methods for setindex!, etc. It is a safe way to store values that should not be modified by the analysis. Note that if you are in a bind, the values of the grid field are not immutable, but don't tell anyone we told you. The correct way of handling predictors you need to modify would be to use convert methods.\n\n\n\n\n\n","category":"type"},{"location":"examples/temperature/#Getting-temperature-data-1","page":"Temperature data","title":"Getting temperature data","text":"","category":"section"},{"location":"examples/temperature/#","page":"Temperature data","title":"Temperature data","text":"In this example, we will look at temperature data from the worldclim 2 data, crop it for Western Europe, and then change the resolution to aggregate the data.","category":"page"},{"location":"examples/temperature/#","page":"Temperature data","title":"Temperature data","text":"temperature = worldclim(1)","category":"page"},{"location":"examples/temperature/#","page":"Temperature data","title":"Temperature data","text":"using Plots, StatsPlots\nheatmap(temperature, clim=(-50,50), c=:RdBu)","category":"page"},{"location":"examples/temperature/#","page":"Temperature data","title":"Temperature data","text":"density(temperature)","category":"page"},{"location":"examples/temperature/#","page":"Temperature data","title":"Temperature data","text":"We will now clip this data, to focus on the region of interest:","category":"page"},{"location":"examples/temperature/#","page":"Temperature data","title":"Temperature data","text":"temperature_europe = temperature[(-10.0,30.0),(30.0,70.0)]\nheatmap(temperature_europe)","category":"page"},{"location":"examples/temperature/#","page":"Temperature data","title":"Temperature data","text":"import Statistics\ntemperature_europe_coarse = coarsen(temperature_europe, Statistics.mean, (3, 3))\nheatmap(temperature_europe_coarse)","category":"page"},{"location":"man/operations/#Other-operations-1","page":"Other operations","title":"Other operations","text":"","category":"section"},{"location":"man/operations/#Grid-coarsening-1","page":"Other operations","title":"Grid coarsening","text":"","category":"section"},{"location":"man/operations/#","page":"Other operations","title":"Other operations","text":"coarsen","category":"page"},{"location":"man/operations/#SimpleSDMLayers.coarsen","page":"Other operations","title":"SimpleSDMLayers.coarsen","text":"coarsen(L::LT, f::FT, d::Tuple{IT,IT}; NaNremove::Bool=true) where {LT <: SimpleSDMLayer, FT <: Function, IT <: Integer}\n\n\n\n\n\n","category":"function"},{"location":"#Simple-SDM-Layers-1","page":"Simple SDM Layers","title":"Simple SDM Layers","text":"","category":"section"},{"location":"#","page":"Simple SDM Layers","title":"Simple SDM Layers","text":"latitudes\nlongitudes","category":"page"},{"location":"#SimpleSDMLayers.latitudes","page":"Simple SDM Layers","title":"SimpleSDMLayers.latitudes","text":"latitudes(p::T) where {T <: SimpleSDMLayer}\n\nReturns an iterator with the latitudes of the SDM layer passed as its argument.\n\n\n\n\n\n","category":"function"},{"location":"#SimpleSDMLayers.longitudes","page":"Simple SDM Layers","title":"SimpleSDMLayers.longitudes","text":"longitudes(p::T) where {T <: SimpleSDMLayer}\n\nReturns an iterator with the longitudes of the SDM layer passed as its argument.\n\n\n\n\n\n","category":"function"},{"location":"man/data/#Bioclimatic-data-1","page":"Data","title":"Bioclimatic data","text":"","category":"section"},{"location":"man/data/#","page":"Data","title":"Data","text":"worldclim","category":"page"},{"location":"man/data/#SimpleSDMLayers.worldclim","page":"Data","title":"SimpleSDMLayers.worldclim","text":"worldclim(layers::Vector{Int64}; resolution::AbstractString=\"10\", path::AbstractString=\"assets\")\n\nDownload and prepare WorldClim 2.0 bioclimatic variables, and returns them as an array of SimpleSDMPredictors. Layers are called by their number, from 1 to 19. The list of available layers is given in a table below.\n\nThe two keywords are resolution, which must be a string, and either 2.5, 5, or 10; and path, which refers to the path where the function will look for the zip and geotiff files.\n\nInternally, this function will download the main zip file for the required resolution from the WordlClim website, extract it, and parse the required layers.\n\nIt is recommended to keep the content of the path folder, as it will eliminate the need to download and/or extract the tiff files. For example, calling wordlclim(1:19) will download and extract everything, and future calls will be much faster.\n\nVariable Description\n1 Annual Mean Temperature\n2 Mean Diurnal Range (Mean of monthly (max temp - min temp))\n3 Isothermality (BIO2/BIO7) (* 100)\n4 Temperature Seasonality (standard deviation *100)\n5 Max Temperature of Warmest Month\n6 Min Temperature of Coldest Month\n7 Temperature Annual Range (BIO5-BIO6)\n8 Mean Temperature of Wettest Quarter\n9 Mean Temperature of Driest Quarter\n10 Mean Temperature of Warmest Quarter\n11 Mean Temperature of Coldest Quarter\n12 Annual Precipitation\n13 Precipitation of Wettest Month\n14 Precipitation of Driest Month\n15 Precipitation Seasonality (Coefficient of Variation)\n16 Precipitation of Wettest Quarter\n17 Precipitation of Driest Quarter\n18 Precipitation of Warmest Quarter\n19 Precipitation of Coldest Quarter\n\n\n\n\n\nworldclim(layer::Int64; x...)\n\nReturn a single layer from WorldClim 2.0.\n\n\n\n\n\nworldclim(layers::UnitRange{Int64}; x...)\n\nReturn a range of layers from WorldClim 2.0.\n\n\n\n\n\n","category":"function"},{"location":"man/overloads/#Base-methods-overloaded-1","page":"Overloads","title":"Base methods overloaded","text":"","category":"section"},{"location":"man/overloads/#","page":"Overloads","title":"Overloads","text":"To facilitate writing julian code, we have overloaded a number of methods from Base. These methods should remove the need to interact with the grid field directly, and also allow to set and get values using the geographic coordinates (as opposed to the grid positions).","category":"page"},{"location":"man/overloads/#","page":"Overloads","title":"Overloads","text":"convert\ncopy\neltype\nsize\nstride\neachindex\ngetindex\nsetindex!\nsimilar","category":"page"},{"location":"man/overloads/#Base.convert","page":"Overloads","title":"Base.convert","text":"Base.convert(::Type{SimpleSDMResponse}, p::T) where {T <: SimpleSDMPredictor}\n\nReturns a response with the same grid and bounding box as the predictor.\n\n\n\n\n\nBase.convert(::Type{SimpleSDMPredictor}, p::T) where {T <: SimpleSDMResponse}\n\nReturns a predictor with the same grid and bounding box as the response.\n\n\n\n\n\n","category":"function"},{"location":"man/overloads/#Base.copy","page":"Overloads","title":"Base.copy","text":"Base.copy(l::T) where {T <: SimpleSDMLayer}\n\nReturns a new copy of the layer, which has the same type.\n\n\n\n\n\n","category":"function"},{"location":"man/overloads/#Base.eltype","page":"Overloads","title":"Base.eltype","text":"Base.eltype(p::T) where {T <: SimpleSDMLayer}\n\nReturns the type of the values stored in the grid.\n\n\n\n\n\n","category":"function"},{"location":"man/overloads/#Base.size","page":"Overloads","title":"Base.size","text":"Base.size(p::T) where {T <: SimpleSDMLayer}\n\nReturns the size of the grid.\n\n\n\n\n\n","category":"function"},{"location":"man/overloads/#Base.stride","page":"Overloads","title":"Base.stride","text":"Base.stride(p::T; dims::Union{Nothing,Integer}=nothing) where {T <: SimpleSDMLayer}\n\nReturns the stride, i.e. the length, of cell dimensions, possibly alongside a side of the grid.\n\n\n\n\n\n","category":"function"},{"location":"man/overloads/#Base.eachindex","page":"Overloads","title":"Base.eachindex","text":"Base.eachindex(p::T) where {T <: SimpleSDMLayer}\n\nReturns the index of the grid.\n\n\n\n\n\n","category":"function"},{"location":"man/overloads/#Base.getindex","page":"Overloads","title":"Base.getindex","text":"Extracts a  value from a layer by its grid position.\n\n\n\n\n\nBase.getindex(p::T, i::R, j::R) where {T <: SimpleSDMLayer, R <: UnitRange}\n\nExtracts a series of positions in a layer, and returns a layer corresponding to the result. This is essentially a way to rapidly crop a layer to a given subset of its extent. The i and j arguments are UnitRanges (of Integer).\n\nThe layer returned by this function will have the same type as the layer passed as its argument, but this can be changed using convert.\n\n\n\n\n\nBase.getindex(p::T, longitude::K, latitude::K) where {T <: SimpleSDMLayer, K <: AbstractFloat}\n\nExtracts the value of a layer at a given latitude and longitude. If values outside the range are requested, will return NaN.\n\n\n\n\n\nBase.getindex(p::T, longitudes::Tuple{K,K}, latitudes::Tuple{K,K}) where {T <: SimpleSDMLayer, K <: AbstractFloat}\n\nExtracts a series of positions in a layer, and returns a layer corresponding to the result. This is essentially a way to rapidly crop a layer to a given subset of its extent. The longitudes and latitudes arguments are tuples of floating point values, representing the bounding box of the layer to extract.\n\nThe layer returned by this function will have the same type as the layer passed as its argument.\n\n\n\n\n\nBase.getindex(p1::T1, p2::T2) where {T1 <: SimpleSDMLayer, T2 <: SimpleSDMLayer}\n\nExtract a layer based on a second layer. Note that the two layers must be compatible, which is to say they must have the same bounding box and grid size.\n\n\n\n\n\n","category":"function"},{"location":"man/overloads/#Base.setindex!","page":"Overloads","title":"Base.setindex!","text":" Base.setindex!(p::T, v, i...) where {T <: SimpleSDMResponse}\n\nChanges the value of a cell, or a range of cells, as indicated by their grid positions.\n\n\n\n\n\nBase.setindex!(p::T, v, lon::Float64, lat::Float64) where {T <: SimpleSDMResponse}\n\nChanges the values of the cell including the point at the requested latitude and longitude.\n\n\n\n\n\n","category":"function"},{"location":"man/overloads/#Base.similar","page":"Overloads","title":"Base.similar","text":"Base.similar(l::T) where {T <: SimpleSDMLayer}\n\nReturns a SimpleSDMResponse of the same dimensions as the original layer, with NaN in the same positions. The rest of the values are replaced by the output of zero(eltype(p.grid)), which implies that there must be a way to get a zero for the type. If not, the same result can always be achieved through the use of copy, manual update, and convert.\n\n\n\n\n\n","category":"function"}]
}
