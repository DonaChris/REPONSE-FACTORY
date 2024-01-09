<?php

namespace App\Helpers;

class ApiHelper
{
    const DEFAULT_LIMITS = [
        "25" => 25,
        "50" => 50,
        "100" => 100,
        "250" => 250,
        "500" => 500,
        "*" => "Tout"
    ];

    const DEFAULT_OFFSET = 0;

    const DEFAULT_FILTER_DATE_MIN = "2022-08-20 00:00";

    const FILTER_ALL = "*";

    private const FILTER_WHERE = "where";

    private const FILTER_WHERE_IN = "whereIn";

    private const FILTER_LIMIT = "limit";

    private const FILTER_OFFSET = "offset";

    private const FILTER_ORDER_BY = "orderBy";

    public const FILTER_EQUALITY = ["<", ">", "=", "<>", "like"];


    const CALLACK_TYPE_FUNCTION = 'function';

    /**
     * @param statut => false,
     * @param route => null,
     * @param error => ["general" => null]
     */
    const DEFAULT_CALLACK = [
        "statut" => false,
        "redirection" => null,
        "error" =>
        [
            "general" => null
            //...
        ]
    ];

    /**
     * @param statut => false,
     * @param callback => null,
     * @param error => ["general" => null]
     * @param success => ["message" => null, ...]
     * @param more => ["resetForm" => false, ...]
     */
    const TOAST_CALLACK = [
        "statut" => false,
        "redirection" => null,
        "error" =>
        [
            "general" => null
            //...
        ],
        "success" =>
        [
            "message" => null
            //...
        ],
        "more" =>
        [
            "resetForm" => false,
            //...
        ]
    ];


    public static function getLimit($limit)
    {
        $rightLimit = self::DEFAULT_LIMITS["25"];
        if (in_array($limit, self::DEFAULT_LIMITS)) {
            $rightLimit = (int) self::DEFAULT_LIMITS[$limit];
        }
        return $rightLimit;
    }

    public static function pageToOffset(int $page, int $limit): int
    {
        if ($page > 0) {
            $page--;
        }
        return ($page * $limit);
    }

    public static function bindModelToFilters(string $model, array $filters)
    {
        $class = new $model();
        foreach ($filters as $filterName => $filterData) {
            switch ($filterName) {
                case self::FILTER_WHERE:
                    if (!empty($filterData)) {
                        $class = $class->$filterName($filterData);
                    }
                    break;

                case self::FILTER_WHERE_IN:
                case self::FILTER_ORDER_BY:
                    if (!empty($filterData)) {
                        foreach ($filterData as $inOption) {
                            if (!empty($inOption)) {
                                $class = $class->$filterName($inOption[0], $inOption[1]);
                            }
                        }
                    }
                    break;

                case self::FILTER_LIMIT:
                case self::FILTER_OFFSET:
                    if (!empty($filterData)) {
                        $class = $class->$filterName($filterData);
                    }
                    break;
            }
        }

        return $class;
    }

    public static function limitLessStat(string $model, array $filter): array
    {
        $result = ["count" => 0];
        /**
         * In order to get real total total account,
         * we need to remove the limit and offset from 
         * the model filter option
         */
        unset($filter["offset"]);
        unset($filter["limit"]);
        $limitlessFilter = $filter;
        $modelNoLimited = ApiHelper::bindModelToFilters($model, $limitlessFilter);

        $result["count"] = $modelNoLimited->count();

        return $result;
    }
}
