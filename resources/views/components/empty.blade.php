<div class="container-fluid">
    <div class="col-lg-6 offset-lg-3 text-center">
        <img class="col-6 col-lg-5" src="{{ asset('main/images/illustration/' . $emptyData['icon'] . '.svg') }}" />
        <h4 class="mt-4"> {{ $emptyData['title'] }}</h4>
        <p>
            <span class="app-fw-100 text-muted app-fs-14px">{!! $emptyData['description'] !!}</span>
        </p>

        @if (!empty($emptyData['action']))
            <button onclick="location.href='{{ $emptyData['action']['link'] }}'"
                class="app-button-lg app-w-fit app-bg-primary text-white px-lg-4 my-4 mb-5">
                <span class="app-text-st-1">
                    <i class="fa fa-arrow-left mx-2" hidden></i>
                    {{ $emptyData['action']['text'] }}
                </span>
            </button>
        @endif

    </div>
</div>
